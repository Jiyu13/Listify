const express = require('express')
const pool = require("../db/db");
const router = express.Router()

router.get('/:user_id', async (req, res) => {
    const {user_id} = req.params

    const user_lists = await pool.query(
        'SELECT l.id, l.name, l.share, ' +
        'TO_CHAR(l.created_at, \'DD Mon YYYY HH12:MI:SS AM\') AS created_at, ' +
        'CAST(COUNT(li.id) AS INT) AS item_count ' +              // counts the number of items in the list_item table for each list
        'FROM lists l ' +
        'JOIN users_lists ul ON l.id = ul.list_id ' +
        'LEFT JOIN list_item li ON l.id = li.list_id ' +
        'WHERE ul.user_id = $1 ' +
        'GROUP BY l.id, l.name, l.share, l.created_at ' + // Groups the results by the unique columns of the lists table
        'ORDER BY l.created_at DESC',
        [parseInt(user_id)]
    );
    const data = user_lists.rows
    if (data.length === 0) {
        return res.status(404).send("You don't have any list. Add one!");
    }
    res.json(data);
});


module.exports = router;
