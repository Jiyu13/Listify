const express = require('express')
const pool = require("../db/db");
const router = express.Router()

// define routes related to lists table

// get all lists
router.get('/', async (req, res) => {
    try {
        const allLists = await pool.query(
            'SELECT id, name, share ' +
            'to_char(created_at, \'DD Mon YYYY HH12:MI:SS AM\')  as created_at, ' +
            'from lists'
        )
        res.json(allLists.rows)
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
})

router.get('/:list_id', async (req, res) => {
    try {
        const {list_id} = req.params
        const listItems = await pool.query(
            'SELECT * FROM list_item WHERE list_id = $1', [list_id]
        )
        const data = listItems.rows
        res.json(data)
    }catch (error) {
        res.status(500).json({ error: "Server error" });
    }
})

// Post new list
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
