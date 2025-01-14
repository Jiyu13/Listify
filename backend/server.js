const express = require('express');
const cors = require('cors');
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 5000;
// const pool = require('./db/db')

// IMPORT ROUTE MODULES
const listRouter = require('./routes/listRoutes')
const userRouter = require('./routes/userRoutes')

// MIDDLEWARES
app.use(cors())
app.use(express.json())



// USER ROUTES -
// don't put a dot at the front of the string route
app.use('/api/v1/listify/lists', listRouter)
app.use('/api/v1/listify/users', userRouter)


// DEFAULT ROUTE
app.get('/api/v1/listify', (req, res) => {
    const data = { message: 'Hello from the API!' };
    res.json(data);
    console.log(data)
})

// Test if connected successfully
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
