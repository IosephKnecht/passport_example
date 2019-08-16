const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const AuthService = require('../app').AuthService;

passport.serializeUser(function (user, callback) {
    if (!user && !user.id) {
        callback(null, user.id)
    } else {
        callback(null)
    }
});

passport.deserializeUser(async function (identifier, callback) {
    try {
        let user = await AuthService.findUser(identifier);
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
                done(isSuccess, false)
            } catch (e) {
                done(e, null)
            }
        }
    ));
}

module.exports = initialize;