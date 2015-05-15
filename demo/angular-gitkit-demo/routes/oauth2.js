var express = require('express');
var util = require('util');
var router = express.Router();

/* GET users listing. */
router.get('/redirect', function (req, res, next) {
    //res.send('respond with a resource');
    res.render('oauth2-widget', {
        data: {}
    });
});

router.get('/sign-in', function (req, res, next) {
    var message = 'no token :-(';

    if (req.cookies.gtoken) {
        var gitkit = req.app.locals.gitkit;
        gitkit.verifyGitkitToken(req.cookies.gtoken, function (err, resp) {
            if (err) {
                message = 'Invalid token: ' + err;
            } else {
                message = 'Welcome back! Login token is: ' + util.inspect(resp);
            }
            res.render('oauth2-sign-in', {
                data: {
                    message: message,
                    url: req.url,
                    token: req.cookies.gtoken,
                    cookies: 'COOKIES' + util.inspect(req.cookies),
                    headers: util.inspect(req.headers)
                }
            });
        });
    } else {
        res.render('oauth2-sign-in', {
            data: {
                message: message,
                url: req.url,
                token: req.cookies.gtoken,
                cookies: 'COOKIES' + util.inspect(req.cookies),
                headers: util.inspect(req.headers)
            }
        });
    }

});

router.get('/sign-out', function (req, res, next) {
    res.redirect('/');
});

router.get('/email', function (req, res, next) {
    res.redirect('/');
});

module.exports = router;
