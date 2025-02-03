const express = require('express')
const pool = require("../db/db");
const router = express.Router()

// define routes related to lists table

// get all lists
router.get('/', async (req, res) => {
    try {
        const allLists = await pool.query(
            'select id, name, share, shared_code, ' +
            'to_char(created_at, \'DD Mon YYYY HH12:MI:SS AM\')  as created_at ' +
            'from lists ' +
            'order by id desc'
        )
        res.json(allLists.rows)
    } catch (error) {
        console.error("Database Error:", error.message);
        res.status(500).json({ error: "Server error" });
    }
})


// Post new list
router.post('/:user_id', async (req, res) => {
    try {
        // console.log(res.req.body)
        const {user_id} = req.params
        const {name} = res.req.body
        const newList = await pool.query(
            `INSERT INTO lists (name) VALUES ($1) RETURNING id, name, share, shared_code, 
            to_char(created_at, \'DD Mon YYYY HH12:MI:SS AM\')  as created_at `,
            [name]
        )
        const newListId = newList.rows[0].id
        await pool.query(
            "insert into users_lists (user_id, list_id) values ($1, $2)", [user_id, newListId]
        )
        res.json(newList.rows[0])
    }catch (error) {
        console.error(error.message)
        res.status(500).json({ error: "Failed to create list." });
    }
})


// Get items by list id
router.get('/:list_id', async (req, res) => {
    try {
        const {list_id} = req.params
        const listItems = await pool.query(
            'SELECT * FROM list_item WHERE list_id = $1 ORDER BY id desc ', [list_id]
        )
        const data = listItems.rows
        res.json(data)
    }catch (error) {
        res.status(500).json({ error: "Server error" });
    }
})

// update a list
router.patch('/:list_id', async(req, res) => {
    try {
        const {list_id} = req.params
        const updatedData = res.req.body

        const setClause = Object.keys(updatedData)
            .map((key, index) => `${key} = $${index+1}`)
            .join(", ")

        const values = [...Object.values(updatedData), parseInt(list_id)]

        const updatedList = await pool.query(
            `update lists set ${setClause} where id = $2 returning *`,
            values
        )

        res.json(updatedList.rows[0])

    } catch (dbError) {
        console.error("Database Error:", dbError.message);
        throw dbError

    }
})


// Post new item
router.post('/:list_id/add-item', async (req, res) => {
    try {
        // console.log(res.req.body)
        const {list_id} = req.params
        const {description, units} = res.req.body
        const newItem = await pool.query(
            "insert into list_item (description, units, list_id) values ($1, $2, $3) RETURNING *",
            [description,  units, list_id]
        )
        res.json(newItem.rows[0])
    }catch (error) {
        console.error(error.message)
        res.status(500).json({ error: "Failed to create new item." });
    }
})


// Patch list item
router.patch('/:list_id/:item_id', async(req, res) => {
    try {
        const {list_id, item_id} = req.params
        const updatedData = res.req.body
        console.log(updatedData)
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
            `update list_item set ${setClause} where list_id = $${values.length - 1} and id = $${values.length} returning *`,
            values
        )

        // If no rows are updated, the item doesn't exist
        if (updatedItem.rows.length === 0) {
            return res.status(404).json({ error: "Item not found." });
        }

        res.json(updatedItem.rows[0]);

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
            'select * from list_item where list_id = $1 order by id desc', [list_id]
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
