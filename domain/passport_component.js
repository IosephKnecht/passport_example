const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const AuthService = require('../app').AuthService;

passport.serializeUser(function (user, callback) {
    let username = user[0].value;

    if (!user || !username) {
        callback(null);
    } else {
        callback(null, username)
    }
});

passport.deserializeUser(async function (username, callback) {
    try {
        let user = await AuthService.findUser(username);
        callback(null, user)
    } catch (e) {
        callback(e)
    }
});

function initialize() {
    passport.use(new LocalStrategy(
        async function (username, password, done) {
            try {
                let isSuccess = await AuthService.authenticate(username, password);
                done(null, isSuccess)
            } catch (e) {
                done(e, null)
            }
        }
    ));
}

module.exports = initialize;