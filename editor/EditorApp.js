"use strict";

// include swarm client library
var Swarm = require('swarm');

var env = Swarm.env;
env.debug = true;

// init model type
var Text = require('swarm/lib/Text');

// create local caching storage
var SharedWebStorage = Swarm.SharedWebStorage;
var storage = new SharedWebStorage('cache');

// determine this swarm Host process id
var hash = window.location.hash || '#0';
var processId = 'me' + hash.replace('#', '~');

// create client host (Host is a container for local model replicas)
var Host = Swarm.Host;
var host = env.localhost = new Host(processId, 0, storage);

var textarea = document.getElementById('text');

// create new replica of Text object with id = "note"
var text = new Text('/Text#note');

if (!text.text && host._id === 'me~1') {
    // if no text in Text object and this Host is in second iframe (hash = #1, not #0)
    // init Text object with some text
    text.set("Hello world!");
}

// listener for Text object changes
function M2V () {
    // set textarea content to new "text" field value
    textarea.value = text.text;
}

// subscribe on the Text object changes
text.on('.init', M2V); // FIXME on('')
text.on(M2V);

// listen for user input and change local Text object replica
textarea.onkeyup = function textChange(ev) {
    var el = ev.target;
    var value = el.value;
    if (value != text.text) {
        // textarea value changed
        // set new value
        text.set(value);
    }
};
