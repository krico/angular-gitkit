var http = require('http');
var URL = require('url');
var path = require('path');
var util = require('util');

'use strict';

function Controller() {
    this.port = 9090;
    this.host = '127.0.0.1';
}

Controller.prototype.port = function (port) {
    if (port !== undefined) this.port = port;
    return this.port;
};

Controller.prototype.host = function (host) {
    if (host !== undefined) this.host = host;
    return this.host;
};

Controller.prototype.service = function (req, res) {
    var url = URL.parse(req.url);
    util.log(req.method + ' ' + url.pathname + ' [' + url.query + ']');
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('OK\n');
    util.log(req.method + ' ' + url.pathname +' ' +util.inspect(req.headers));
};

Controller.prototype.start = function (port, host) {
    if (port !== undefined) this.port = port;
    if (host !== undefined) this.host = host;

    http.createServer(this.service).listen(this.port, this.host);
    util.log(util.format('Server started at http://%s:%d/', this.host, this.port));
};

module.exports = Controller;