const express = require('express');
const cors = require('cors');
const { Pool } = require('pg')
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 5000;

// ==========================PostgreSQL pool=========================================================
const pool = new Pool ({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})
pool.connect().then(() => console.log("connected"))

// ======================middleware=================================================================
app.use(cors())
app.use(express.json())

// ============================Define your API routes here ===============================================
app.get('/api/v1/listify', (req, res) => {
    const data = { message: 'Hello from the API!' };
    res.json(data);
})
// ============================================================================================================
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
