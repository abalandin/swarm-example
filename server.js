"use strict";

// Simple Swarm sync server: picks model classes from a directory,
// starts a WebSocket server at a port. Serves some static content,
// although I'd recomment to shield it with nginx.
var fs = require('fs');
var path = require('path');
var url = require('url');
var http = require('http');

var ws_lib = require('ws');
var express = require('express');
var compression = require('compression');

var Swarm = require('swarm');
var EinarosWSStream = require('swarm/lib/EinarosWSStream');

var args = process.argv.slice(2);
var argv = require('minimist')(args, {
    alias: {
        models: 'm',
        port:  'p',
        debug: 'D',
        store: 's'
    },
    boolean: ['debug'],
    default: {
        models: 'model/',
        store: '.swarm',
        port: 8000,
        debug: false
    }
});

Swarm.env.debug = argv.debug;

var app = express();
app.use(compression());
app.use(express.static('.'));

// use file storage
var fileStorage = new Swarm.FileStorage(argv.store);

// create Swarm Host
app.swarmHost = new Swarm.Host('swarm~nodejs', 0, fileStorage);
Swarm.env.localhost = app.swarmHost;

// start the HTTP server
var httpServer = http.createServer(app);

httpServer.listen(argv.port, function (err) {
    if (err) {
        console.warn('Can\'t start server. Error: ', err, err.stack);
        return;
    }
    console.log('Swarm server started port', argv.port);
});

// start WebSocket server
var wsServer = new ws_lib.Server({
    server: httpServer
});

// accept pipes on connection
wsServer.on('connection', function (ws) {
    var params = url.parse(ws.upgradeReq.url, true);
    console.log('incomingWS %s', params.path, ws.upgradeReq.connection.remoteAddress);
    app.swarmHost.accept(new EinarosWSStream(ws), { delay: 50 });
});

process.on('SIGTERM', onExit);
process.on('SIGINT', onExit);
process.on('SIGQUIT', onExit);

process.on('uncaughtException', function(err) {
    console.log('uncaught:', err, err.stack);
    onExit(100);
});

function onExit(exitCode) {
    console.log('shutting down http-server...');
    httpServer.close();

    console.log('closing swarm host...');
    var forcedExit = setTimeout(function () {
        console.log('swarm host close timeout');
        process.exit(exitCode);
    }, 5000);

    app.swarmHost.close(function () {
        console.log('swarm host closed');
        clearTimeout(forcedExit);
        process.exit(exitCode);
    });
}

// boot model classes
var modelPathList = argv.models;
modelPathList.split(/[:;,]/g).forEach(function (modelPath) {
    modelPath = path.resolve(modelPath);
    console.log('scanning',modelPath);
    var modelClasses = fs.readdirSync(modelPath), modelFile;
    while (modelFile = modelClasses.pop()) {
        if (!/^\w+\.js$/.test(modelFile)) { continue; }
        var modpath = path.join(modelPath, modelFile);
        var fn = require(modpath);
        if (fn.constructor !== Function) { continue; }
        if (fn.extend !== Swarm.Syncable.extend) { continue; }
        console.log('Model loaded', fn.prototype._type, ' at ', modpath);
    }
});
