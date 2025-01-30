/**
 * @type {import('pg').Pool}
 */
const { Pool } = require('pg')

const dotenv = require("dotenv");
const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.development"
dotenv.config({ path: envFile }); // Load the correct .env file

// console.log("DB_HOST:", process.env.DB_HOST); // Debugging output

const pool = new Pool ({
    // user: process.env.DB_USER,
    // host: process.env.DB_HOST,
    // database: process.env.DB_NAME,
    // password: process.env.DB_PASSWORD,
    // port: process.env.DB_PORT,
    connectionString: process.env.DB_HOST, // PostgreSQL URL
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
})

module.exports =  pool;
