const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.isAuthenticated) {
        return next()
    }
    res.redirect('/');
});

module.exports = router;
