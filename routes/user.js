// userRouter.js

const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// 连接到 SQLite 数据库
const db = new sqlite3.Database('data.sqlite3');

router.get('/', (req, res) => {
    res.status(200);
    res.json({
        code: 200,
        data: 'success'
    });
});

// 用户注册路由
router.post('/register', (req, res) => {
    const { mail, password } = req.body;

    // 邮箱格式验证
    if (!mail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        return res.status(400).json({ error: "邮箱格式错误" });
    }

    // 检查邮箱是否已经存在
    db.get("SELECT * FROM user WHERE mail = ?", [mail], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (row) {
            return res.status(400).json({ error: "邮箱已经被注册" });
        }

        // 生成盐
        const salt = crypto.randomBytes(12).toString('hex');
        // 裁剪密码
        const password_desalt = password.slice(-12);
        // 生成服务器盐
        const server_salt = crypto.randomBytes(24).toString('hex');
        // 拼接并加盐
        const password_salted = password_desalt + server_salt;
        // 计算密码的 MD5 值
        const password_hash = crypto.createHash('md5').update(password_salted).digest('hex');

        // 默认昵称为 "用户 + uid"
        db.run("INSERT INTO user (mail, nickname, password, salt) VALUES (?, ?, ?, ?)", [mail, '', password_hash, salt], function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            const uid = this.lastID; // 获取刚插入的自增主键值
            const nickname = "用户" + uid;
            db.run("UPDATE user SET nickname = ? WHERE uid = ?", [nickname, uid], function(err) {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                const token = jwt.sign({ uid: uid }, process.env.JWT_SECRET || '0123456789', { expiresIn: '24h' });
                res.status(201).json({ message: "用户注册成功", uid: uid, token: token });
            });
        });
    });
});


// 用户登录路由
router.post('/login', (req, res) => {
    const { mail, password } = req.body;

    // 查询用户数据
    db.get("SELECT * FROM user WHERE mail = ?", [mail], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (!row) {
            res.status(401).json({ error: "邮箱或密码错误" });
        } else {
            // 根据用户盐重新计算密码的 MD5 值，并与数据库中的密码比对
            const password_salted = password.slice(0, 12) + row.salt + password.slice(-12);
            const password_hash = crypto.createHash('md5').update(password_salted).digest('hex');
            if (password_hash === row.password) {
                // 生成 JWT
                const token = jwt.sign({ uid: row.uid }, process.env.JWT_SECRET || '0123456789', { expiresIn: '24h' });
                res.json({ message: "登录成功！", token: token });
            } else {
                res.status(401).json({ error: "邮箱或密码错误" });
            }
        }
    });
});

module.exports = router;