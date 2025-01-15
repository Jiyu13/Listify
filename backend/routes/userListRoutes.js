const express = require('express')
const pool = require("../db/db");
const router = express.Router()

router.get('/:user_id', async (req, res) => {
    const {user_id} = req.params

    const user_lists = await pool.query(
        'SELECT id, name, share, ' +
        'TO_CHAR(l.created_at, \'DD Mon YYYY HH12:MI:SS AM\') AS created_at ' +
        'FROM lists l ' +
        'JOIN users_lists ul ON l.id = ul.list_id ' +
        'WHERE ul.user_id = $1 ' +
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
