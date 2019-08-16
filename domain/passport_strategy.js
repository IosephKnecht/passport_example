const passport_strategy = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const AuthService = require('../app').AuthService;

function initPassport() {
    passport_strategy.use(new LocalStrategy(
        async function (username, password, done) {
            try {
                let isSuccess = await AuthService.prototype.authenticate(username, password);
                done(isSuccess, false)
            } catch (e) {
                done(e, null)
            }
        }
    ))
}

module.exports = initPassport;