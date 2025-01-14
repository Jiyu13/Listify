const express = require('express')
const bcrypt = require('bcrypt')
const pool = require("../db/db");

const router = express.Router()

// const hashPassword = async (password) => {
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds)
//     return hashedPassword
// }
router.post('/', async (req, res) => {
    try {
        const {username, email, password} = res.req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)';
        const newUser = await pool.query(query, [username, email, hashedPassword])
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: "Server error" });
    }
})

module.exports = router;
