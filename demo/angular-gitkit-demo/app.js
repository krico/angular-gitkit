var fs = require('fs');
var express = require('express');
var expressPlates = require('express-plates');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var GitkitClient = require('gitkitclient');
var debug = require('debug')('angular-gitkit-demo:server');

var routes = require('./routes/index');
var oauth2 = require('./routes/oauth2');
var users = require('./routes/users');

var app = express();
var plates = expressPlates.init(app);

var gitkitConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'config', 'gitkit-server-config.json')));
gitkitConfig.serviceAccountPrivateKeyFile = path.join(__dirname, 'config', gitkitConfig.serviceAccountPrivateKeyFile);
var pemFile = gitkitConfig.serviceAccountPrivateKeyFile;
pemFile = pemFile.substr(0, pemFile.length - 4) + '.pem';

if (!fs.existsSync(pemFile)) {
    throw 'You must run `openssl pkcs12 -in angular-gitkit.p12 -out angular-gitkit.pem -nodes`';
}
gitkitConfig.serviceAccountPrivateKeyFile = pemFile;
app.locals.gitkit = new GitkitClient(gitkitConfig);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/oauth2', oauth2);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            data: {
                message: err.message,
                'error.status': err.status,
                'error.stack': err.stack
            }
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        data: {
            message: err.message,
            'error.status': '',
            'error.stack': ''
        }
    });
});


module.exports = app;
