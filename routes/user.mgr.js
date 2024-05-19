// userMgr

const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// 连接到 SQLite 数据库
// const db = new sqlite3.Database('data.sqlite3');

router.get('/info', (req, res) => {
    const { uid } = req.user;
    db = req.db;
    db.get(`SELECT mail, nickname, data_qq, consumption, limitation FROM user WHERE uid = ?`, [uid], (err, row) => {
        if (err) {
            console.error(err.message);
            return res.sendStatus(500);
        }
        if (!row) {
            return res.sendStatus(500);
        }
        res.status(200).json(row);
    });
});

module.exports = router;