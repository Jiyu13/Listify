const express = require('express')
const bcrypt = require('bcrypt')
const pool = require("../db/db");

const router = express.Router()
const SALT = process.env.SALTROUNDS

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(SALT);
    return await bcrypt.hash(password, salt)
}

router.patch('/:user_id', async(req, res) => {
    try {
        const {user_id} = req.params
        const updatedData = req.body

        const userId = parseInt(user_id)

        if (updatedData.username) {
            const usernameCheck = await pool.query(
                'select id from users where username = $1 and id != $2', [updatedData.username, userId]
            )
            if (usernameCheck.rows.length > 0) {
                return res.status(409).json({error: "Username has been taken."})
            }
        }

        const setClause = Object.keys(updatedData)
            .map((key, index) => `${key} = $${index+1}`)
            .join(", ")

        const values = [...Object.values(updatedData), userId]

        const updatedUser= await pool.query(
            `update users set ${setClause} where id = $2 returning id, username, email, 
            TO_CHAR(created_at, 'DD Mon YYYY HH12:MI:SS AM') AS formatted_created_at`,
            values
        )

        res.status(201).json(updatedUser.rows[0])
    } catch (error) {
        console.error(error.message)
        res.status(500).json({error: "Failed to update user info."});
    }
})

router.post('/', async (req, res) => {
    try {
        const {newUser} = req.body
        const hashedPassword = await hashPassword(newUser.password)
        const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';
        const data = await pool.query(query, [newUser.username, newUser.email, hashedPassword])
        res.status(201).json({
            message: "User created successfully",
            data: data.rows[0]
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: "Server error" });
    }
})


router.get('/:email', async (req, res) => {
    try {
        const {email} = req.params
        const targetUser= await pool.query(
            'SELECT * FROM users WHERE email = $1', [email]
        )
        if (targetUser.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        const data = targetUser.rows[0]
        res.json({
            id: data.id,
            username: data.username,
            email: data.email,
            created_at: data.created_at
        })
        // console.log(targetUser.rows[0])
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: "Server error" });
    }
})
module.exports = router;
