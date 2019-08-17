const express = require('express');
const router = express.Router();
const AuthenticationService = require('../app').AuthService;

/* GET home page. */
// router.get('/', function (req, res, next) {
//     if (req.isAuthenticated) {
//         return next()
//     }
//     res.redirect('/');
// });

router.get('/', function (req, res) {
    res.render('auth');
});
router.post('/', async function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let user = await AuthenticationService.authenticate(username, password);
    res.json({
        user
    });
});

module.exports = router;
