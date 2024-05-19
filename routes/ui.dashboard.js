// uiDashboard.js

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// GET / 路由
router.get('/', (req, res, next) => {
    const token = req.cookies.accessToken;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET || '0123456789', (err, decoded) => {
            if (err) {
                // JWT 验证失败，返回 401
                res.render('dashboard', {
                    redirectTarget: '/errorpage/401/身份验证未通过'
                });
            } else {
                // JWT 验证成功，渲染 dashboard 页面
                res.render('dashboard', {
                    redirectTarget: '/dashboard/profile'
                });
            }
        });
    } else {
        // 没有 token，返回 401
        res.sendStatus(401);
    }
});

router.get('/profile', (req, res, next) => {
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
        res.render('dashboard-profile', {
            nickname: row.nickname,
            mail: row.mail
        });
    });
});

module.exports = router;