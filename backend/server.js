const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// app.use(cors())
app.use(express.json())

// // ============================Define your API routes here// ===============================================
app.get('/api/v1/listify', (req, res) => {
    const data = { message: 'Hello from the API!' };
    res.json(data);
})
// ============================================================================================================
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
