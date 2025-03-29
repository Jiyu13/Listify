const express = require('express');
const cors = require('cors');

//
const dotenv = require("dotenv");
const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.development";
dotenv.config({ path: envFile });

const app = express();
const PORT = process.env.SERVER_PORT || 5000;

// IMPORT ROUTE MODULES
const listRouter = require('./routes/listRoutes')
const userRouter = require('./routes/userRoutes')
const userListRouter = require('./routes/userListRoutes')

// MIDDLEWARES
app.use(cors())
app.use(express.json())



// USER ROUTES -
// don't put a dot at the front of the string route
app.use('/api/v1/listify/lists', listRouter)
app.use('/api/v1/listify/users', userRouter)
app.use('/api/v1/listify/ul', userListRouter)


// DEFAULT ROUTE
const axios = require("axios");
app.get('/api/v1/listify', (req, res) => {
    const data = { message: 'Hello from the API!' };
    res.json(data);
    console.log(data)
})
// setInterval(async () => {
//     try {
//         const users = await axios.get(`${process.env.BACKEND_URL}/api/v1/listify/users/users`)
//         const data = users.data;
//         console.log("User counts", data)
//     } catch (error) {
//             console.error("Fetch user failed:", error.message);
//         }
// },  6 * 24 * 60 * 60 * 1000)  // Every 6 days


setInterval(async () => {
    try {
        const userID = process.env.MYUSERID
        const user = await axios.patch(`${process.env.BACKEND_URL}/api/v1/listify/users/test/${userID}`)
        console.log("User counts", user.data)
    } catch (error) {

    }
}, 60 * 1000)

setInterval(async () => {
    try {
        await axios.get(`${process.env.BACKEND_URL}/api/v1/listify`)
        console.log('Keep alive succeed.')
    } catch (error) {
        console.error("Keep-alive failed:", error.message);
    }
}, 10 * 60 * 1000)  // Every 10 minutes


// // // Test if connected to local database successfully
// const pool = require('./db/db')
// pool.query('SELECT * from lists', (err, res) => {
//     if (err) {
//         console.error('Error connecting to database:', err);
//     } else {
//         console.log('Database connection successful:', res.rows);
//     }
// });


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
