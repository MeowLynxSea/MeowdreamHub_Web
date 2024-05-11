var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const sqlite3 = require('sqlite3').verbose();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

var userRouter = require('./routes/user');

// 连接到 SQLite 数据库，若不存在则创建新的数据库文件
const db = new sqlite3.Database('data.sqlite3', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('[Init] Connected to the SQLite database.');
        // 创建用户表，如果不存在的话
        db.run(`CREATE TABLE IF NOT EXISTS user (
          uid INTEGER PRIMARY KEY AUTOINCREMENT,
          mail TEXT NOT NULL UNIQUE,
          nickname TEXT NOT NULL,
          password TEXT NOT NULL,
          salt TEXT NOT NULL,
          data_qq TEXT
      )`);
    }
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use((req, res, next) => {
    req.db = db;
    next();
})

app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;