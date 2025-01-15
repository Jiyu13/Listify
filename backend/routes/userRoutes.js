const express = require('express')
const bcrypt = require('bcrypt')
const pool = require("../db/db");

const router = express.Router()
const SALT = process.env.SALTROUNDS

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(SALT);
    return await bcrypt.hash(password, salt)
}
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
