"use strict";

var React = require('react');
var Swarm = require('swarm');

// register "iframe:" protocol
require('swarm/lib/PostMessageStream');

var env = Swarm.env;

var Spec = Swarm.Spec;
var Host = Swarm.Host;
var Storage = Swarm.Storage;

// models
var Agenda = require('./model/Agenda');

// views
var AgendaView = require('./view/AgendaView');

// ConfApp instance
var app = window.app = {};
app.id = window.localStorage.getItem('localuser') || 'A' + Spec.int2base((Math.random() * 10000) | 0);
window.localStorage.setItem('localuser', app.id);
env.debug = true;

var hash = window.location.hash || '#0';
// create Host
var processId = app.id + hash.replace('#', '~') + 'agnd';
app.host = env.localhost = new Host(processId, 0, new Storage(false));
app.host.getSources = function () {
    var self = this;
    return Object.keys(this.sources).map(function (key) { return self.sources[key]; });
};
app.uplink_uri = 'iframe:parent';
app.host.connect(app.uplink_uri);

app.agendaSpec = '/Agenda#' + app.id;
app.agenda = new Agenda(app.agendaSpec);

app.host.on('reon', function (spec, val) {
    document.body.setAttribute('connected', app.host.isUplinked());
});
app.host.on('off', function (spec, val) {
    document.body.setAttribute('connected', app.host.isUplinked());
});

// insert <script> before </body> !
React.renderComponent(
        AgendaView({spec: app.agendaSpec}),
        document.getElementById('agenda')
    );
