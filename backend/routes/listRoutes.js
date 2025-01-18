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
            'from lists' +
            'order by id asc'

        )
        res.json(allLists.rows)
    } catch (error) {
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


// Patch list item
router.patch('/:list_id/:item_id', async(req, res) => {
    try {
        const {list_id, item_id} = req.params
        const updatedData = res.req.body

        // Validate if there are any fields to update
        if (!updatedData || Object.keys(updatedData).length === 0) {
            return res.status(400).json({ error: "No data provided for update." });
        }

        // Build the SET clause dynamically
        const setClause = Object.keys(updatedData)
            .map((key, index) => `${key} = $${index+1}`)
            .join(", ")

        // Collect the values to bind to the query
        const values = [...Object.values(updatedData), parseInt(list_id), parseInt(item_id)]

        const updatedItem = await pool.query(
            `update list_item set ${setClause} where list_id = $2 and id = $3 returning *`,
            values
        )

        // If no rows are updated, the item doesn't exist
        if (updatedItem.rows.length === 0) {
            return res.status(404).json({ error: "Item not found." });
        }

        res.json(updatedItem.rows);

    } catch (dbError) {
        console.error("Database Error:", dbError.message);
        throw dbError

    }
})


router.delete('/:list_id/:item_id', async (req, res) => {

    try {
        const {list_id, item_id} = req.params
        const deleteResponse = await pool.query('delete from list_item where id = $1', [item_id])

        const remainingItems = await pool.query(
            'select * from list_item where list_id = $1 order by id asc', [list_id]
        )

        res.json(remainingItems.rows)
    }catch (error) {
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
