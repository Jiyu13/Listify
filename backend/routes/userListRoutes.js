const express = require('express')
const pool = require("../db/db");
const router = express.Router()

router.get('/shared-users/:list_id/:user_id', async (req, res) => {
    const {list_id, user_id} = req.params
    try {
        const sharedUsers = await pool.query(
            'SELECT u.id as user_id, u.username ' +
            'FROM users u ' +
            'JOIN users_lists ul ON u.id = ul.user_id ' +
            'WHERE ul.list_id = $1  AND u.id != $2',
            [parseInt(list_id), parseInt(user_id)]
        );
        const data = sharedUsers.rows
        res.json(data);
    } catch (error) {
        console.error('Error fetching shared users:', error);
        res.status(500).json({ error: "Failed to fetch lists by shared user." });
    }

})

router.get('/:user_id', async (req, res) => {
    const {user_id} = req.params
    try {
        const user_lists = await pool.query(
            'SELECT l.id, l.name, l.share, l.shared_code, ' +
            'TO_CHAR(l.created_at, \'DD Mon YYYY HH12:MI:SS AM\') AS created_at, ' +
            'CAST(COUNT(li.id) AS INT) AS item_count ' +              // counts the number of items in the list_item table for each list
            'FROM lists l ' +
            'JOIN users_lists ul ON l.id = ul.list_id ' +
            'LEFT JOIN list_item li ON l.id = li.list_id ' +
            'WHERE ul.user_id = $1 ' +
            'GROUP BY l.id, l.name, l.share, l.shared_code, l.created_at ' + // Groups the results by the unique columns of the lists table
            'ORDER BY l.created_at DESC',
            [parseInt(user_id)]
        );
        const data = user_lists.rows
        // if (data.length === 0) {
        //     return res.status(404).send("You don't have any list. Add one!");
        // }
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch lists by user id." });
    }

});

router.delete('/:user_id/:list_id', async (req, res) => {

    try {
        const {user_id, list_id} = req.params   //
        const parsedUserId = parseInt(user_id);
        const parsedListId = parseInt(list_id);

        // Begin a transaction to ensure atomicity
        await pool.query('BEGIN');

        const deleteResponse = await pool.query(
            'delete from users_lists where user_id = $1 and list_id = $2',
            [parsedUserId, parsedListId]
        )

        // Check if a row was deleted
        if (deleteResponse.rowCount === 0) {
            return res.status(404).json({ error: "List not found for the given user_id and list_id." });
        }

        // Check if the list is still associated with any other users
        const usageCheck = await pool.query(
            'select count(*) as user_count from users_lists where list_id = $1',
            [parsedListId]
        )

        const userCount = parseInt(usageCheck.rows[0].user_count, 10)
        // If no other users are associated, delete the list from `lists`
        if (userCount === 0) {
            await pool.query('DELETE FROM lists WHERE id = $1', [parsedListId])
            console.log(`List ${parsedListId} deleted from lists table`);
        }

        // Commit the transaction
        await pool.query('COMMIT');

        res.json({data: "List deleted."})
    }catch (error) {
        res.status(500).json({ error: "Server error" });
    }
})

router.post('/:list_id', async (req, res) => {
    const {list_id} = req.params
    const data = res.req.body

    try {
        // check if user exist
        const setClause = Object.keys(data)
            .map((key, index) => `${key} = $${index+1}`)
            .join(", ")
        const value = [...Object.values(data)]
        const user = await pool.query(`select id from users where ${setClause}`, value);

        if (user.rows.length === 0) {
            return res.status(404).json({error: "User not found."})
        }

        // if user exists
        await pool.query('' +
            'insert into users_lists (user_id, list_id) values ($1, $2) returning *',
            [user.rows[0].id, parseInt(list_id)]
        );

        // update list share column to be true
        const updatedList = await pool.query(
            `update lists set share = $1 where id = $2 returning id, username, email,
            TO_CHAR(created_at, 'DD Mon YYYY HH12:MI:SS AM') AS formatted_created_at`,
            [true, parseInt(list_id)]
        );

        res.status(200).json(updatedList.rows[0])
    } catch (error) {
        console.error("Error adding user to the list:", error);
        res.status(500).json({ error: "Internal server error." })
    }
});

module.exports = router;
