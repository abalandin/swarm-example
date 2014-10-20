"use strict";

var SyncSet = require('swarm').Set;

// this collection class has no functionality except for being a list
// of all mice currently alive; we'll only use one singleton object
// set mixin
module.exports = SyncSet.extend('Mice', {

});
