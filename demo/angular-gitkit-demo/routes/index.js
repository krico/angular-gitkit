var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        data: {
            title: 'angular-gitkit-demo - Welcome',
            message: 'Welcome to angular-gitkit-demo'
        }
    });
});

module.exports = router;
