const express = require('express')
const bcrypt = require('bcrypt')
const pool = require("../db/db");

const router = express.Router()

const hashPassword = async (password) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
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

module.exports = router;
