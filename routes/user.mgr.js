// userMgr

const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// 连接到 SQLite 数据库
const db = new sqlite3.Database('data.sqlite3');

//test
router.get('/everything', (req, res) => {
    db.all('SELECT * FROM user', (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(rows);
    });
});

module.exports = router;