const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const AuthService = require('../app').AuthService;

passport.serializeUser(function (user, callback) {
    let username = user.value;

    if (!user || !username) {
        callback(null);
    } else {
        callback(null, username);
    }
});

passport.deserializeUser(async function (username, callback) {
    try {
        let user = await AuthService.findUser(username);

        if (!user) {
            callback(null);
        } else {
            callback(null, user);
        }
    } catch (e) {
        callback(e);
    }
});

function initialize() {
    passport.use(new LocalStrategy(
        async function (username, password, done) {
            try {
                let users = await AuthService.authenticate(username, password);

                if (!users) {
                    return done(null);
                }

                let user = users[0];

                if (!users || !user) {
                    done(null);
                } else {
                    done(null, user);
                }
            } catch (e) {
                done(e, null);
            }
        }
    ));
}

module.exports = initialize;