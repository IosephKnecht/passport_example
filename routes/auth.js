const express = require('express');
const router = express.Router();
const AuthenticationService = require('../app').AuthService;
const passport = require('passport');

router.get('/', function (req, res) {
    res.render('auth');
});

router.get('/main', function (req, res) {
    let username = req.session.passport.user;
    res.render('main.ejs', {
        username
    });
});
router.post('/', passport.authenticate('local'), function (req, res) {
    res.redirect('/main');
});

router.post('/register', async function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let user = await AuthenticationService.register(username, password);
    res.json({
        user
    });
});

module.exports = router;
