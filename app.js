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

const app = express();

const Connection = require('tedious').Connection;
const AuthDao = require('./domain/auth_dao_impl');
const AuthService = require('./domain/authentication_service');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/public', express.static('public'));

app.use(session({
    store: new RedisStore(config.redisStore),
    secret: config.redisStore.secret,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

let connection = new Connection(config.mssqlStore);
let authDao = new AuthDao(connection);
let authService = new AuthService(authDao);

module.exports = app;
module.exports.AuthService = authService;

// region components require
require('./domain/passport_component')();
// endregion

const authRouter = require('./routes/auth');
app.use('/', authRouter);
