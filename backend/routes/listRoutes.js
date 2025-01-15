const express = require('express')
const pool = require("../db/db");
const router = express.Router()

// define routes related to lists table
router.get('/', async (req, res) => {
    try {
        const allLists = await pool.query(
            'SELECT id, name, share ' +
            'to_char(created_at, \'DD Mon YYYY HH12:MI:SS AM\')  as created_at, ' +
            'from lists'
        )
        res.json(allLists.rows)
        console.log()
    }catch (error) {
        console.error(error.message)
        res.status(500).json({ error: "Server error" });
    }
})

router.post('/', async (req, res) => {
    try {
        // console.log(res.req.body)
        const {name} = res.req.body
        const newList = await pool.query(
            "INSERT INTO lists (name) VALUES ($1) RETURNING *", [name]
        )
        res.json(newList)
    }catch (error) {
        console.error(error.message)
        res.status(500).json({ error: "Server error" });
    }
})

// router.get('/:id', (req, res) => {
//   const list = lists.find(l => l.id === parseInt(req.params.id));
//   if (!list) {
//     return res.status(404).send('List not found');
//   }
//   res.json(list);
// });
module.exports = router;
