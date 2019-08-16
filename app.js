const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require('./config');

// region for implement session
const passport = require('passport');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
// endregion

// region routes
const authRouter = require('./routes/auth');
// endregion

const app = express();

const Connection = require('tedious').Connection;
const AuthService = require('./domain/authentication_service');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.use(session({
    store: new RedisStore(config.redisStore.url),
    secret: config.redisStore.secret,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

let connection = new Connection(config.mssqlStore);

authService = new AuthService(connection);

module.exports = app;
module.exports.AuthService = authService;

// region components require
require('./domain/passport_component')();
// endregion
