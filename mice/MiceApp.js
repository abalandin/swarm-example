"use strict";

var React = require('react');
var Swarm = require('swarm');
var env = Swarm.env;
var Spec = Swarm.Spec;
var Host = Swarm.Host;

// models:
var Mouse = require('./model/Mouse');
require('./model/Mice');

// view:
var MiceAppView = require('./view/MiceAppView');

// controller:
require('./ctrl/MiceAppCtrl');

console.warn('mice app loading');

var app = window.app = {};
app.id = window.localStorage.getItem('localuser') || 'A' + Spec.int2base((Math.random() * 10000) | 0);
window.localStorage.setItem('localuser', app.id);

// server host uri
app.wsServerUri = 'ws://' + window.location.host;

var hash = window.location.hash || '#0';

// create Host
app.host = env.localhost = new Host(app.id + hash.replace('#', '~'));

var ssn = app.id.match(/A([\w~_]+)/)[1]; // FIXME ugly
var ssnInt = Spec.base2int(ssn);

// create a Mouse object replica
var mickey = app.mouse = new Mouse(app.id);

// subscribe to mouse changes
mickey.on('.init', function () {
    if (this._version!=='!0') { return; } // FIXME default values
    mickey.set({
        x:100+(0|(Math.random()*100)),
        y:100+(0|(Math.random()*100)),
        symbol: String.fromCharCode(10000+ssnInt%60) // dingbats
    });
});

// open #mice, list our object
app.mice = app.host.get('/Mice#mice', function(){
    app.mice.addObject(mickey);
});

// connect to server
app.host.connect(app.wsServerUri, {delay: 50});

//catch online/offline status changes
app.host.on('reon', function (spec, val) {
    document.body.setAttribute('connected', app.host.isUplinked());
    app.mice._version && app.mice.addObject(mickey); // reinsert mickey
    // TODO this _version check is annoying! Use _tail instead. FIXME
});
app.host.on('reoff', function (spec, val) {
    document.body.setAttribute('connected', app.host.isUplinked());
});
app.host.on('off', function (spec, val) {
    document.body.setAttribute('connected', app.host.isUplinked());
    // FIXME: Pipe does not reconnect after server-initiated disconnection
});

window.onbeforeunload = function(e) {
    // remove mouse from Set
    app.mice.removeObject(mickey);
    // close host
    app.host.close();
};

window.onload = function () {
    // make it live
    React.renderComponent(
        MiceAppView ({spec:app.mice.stateSpec()}),
        document.getElementById('mice-container')
    );
};
