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
                res.sendStatus(401);
            } else {
                // JWT 验证成功，渲染 dashboard 页面
                res.render('dashboard');
            }
        });
    } else {
        // 没有 token，返回 401
        res.sendStatus(401);
    }
});

module.exports = router;