var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const sqlite3 = require('sqlite3').verbose();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

var userAuthRouter = require('./routes/user.auth');
var userMgrRouter = require('./routes/user.mgr');
var uiDashboardRouter = require('./routes/ui.dashboard');

const db = new sqlite3.Database('data.sqlite3', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('[DB] Connected to the SQLite database.');
        db.run(`CREATE TABLE IF NOT EXISTS user (
            uid INTEGER PRIMARY KEY AUTOINCREMENT,
            mail TEXT NOT NULL UNIQUE,
            nickname TEXT NOT NULL,
            password TEXT NOT NULL,
            salt TEXT NOT NULL,
            data_qq TEXT,
            consumption INTEGER DEFAULT 0,
            limitation INTEGER DEFAULT -1
        )`, (err) => {
            if (err) {
                console.error('[DB] Error creating user table:', err.message);
            } else {
                console.log('[DB] User table created/verified successfully.');
            }
        });
        db.run(`CREATE TABLE IF NOT EXISTS server (
            name TEXT NOT NULL,
            description TEXT,
            remark TEXT,
            last_online TEXT,
            id TEXT NOT NULL UNIQUE,
            token TEXT NOT NULL UNIQUE
        )`, (err) => {
            if (err) {
                console.error('[DB] Error creating server table:', err.message);
            } else {
                console.log('[DB] Server table created/verified successfully.');
            }
        });
    }
});

const isAllowedFile = (filename) => {
    const allowedFiles = [
        'android-chrome-192x192.png',
        'android-chrome-512x512.png',
        'apple-touch-icon.png',
        'bootstrap.min.css',
        'browserconfig.xml',
        'docs.html',
        'favicon-16x16.png',
        'favicon-32x32.png',
        'favicon.ico',
        'index.html',
        'mstile-150x150.png',
        'safari-pinned-tab.svg',
        'loginWindow.html',
        'registerWindow.html'
    ];
    return allowedFiles.includes(filename);
};

const allowSpecificFiles = (req, res, next) => {
    const url = req.originalUrl;
    const filename = url.substring(url.lastIndexOf('/') + 1);
    if (isAllowedFile(filename)) {
        next();
    } else {
        next(createError(403));
    }
};

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/docs', express.static(path.join(__dirname, 'public', 'docs')));
app.use('/fixed', express.static(path.join(__dirname, 'public', 'fixed')));

app.use((req, res, next) => {
    req.db = db;
    next();
});

const authenticateJWT = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET || '0123456789', (err, user) => {
            if (err) {
                return next(createError(403));
            }
            req.user = user;
            next();
        });
    } else {
        next(createError(401));
    }
};

app.use('/api/user/auth', userAuthRouter);
//app.use('/api/open', some routes here);

app.use(authenticateJWT);

app.use('/api/user/mgr', userMgrRouter);
app.use('/dashboard', uiDashboardRouter);

app.use('/public', (req, res, next) => {
    const url = req.originalUrl;
    if (url.startsWith('/public')) {
        allowSpecificFiles(req, res, next);
    } else {
        next();
    }
});

app.get('/errorpage/:code/:message', (req, res, next) => {
    res.render('error', {
        error: {
            status: req.params.code,
            message: req.params.message
        }
    });
});

app.get('/error/:code', (req, res, next) => {
    const errorCode = req.params.code;
    next(createError(Number(errorCode)));
});

app.use(function(req, res, next) {
    next(createError(404));
});

app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 200);
    if (err.status === 404) {
        res.render('error');
    } else if (err.status === 403) {
        res.render('error');
    } else {
        res.render('error');
    }
});

module.exports = app;