'use strict'

console.log("run-state: current working directory - " + __dirname);

var actionInit = require('../src/states/action-init');
var FSM = require('../src/states/fsm');

console.log("run-state: current state is '" + JSON.stringify(FSM.current()));
console.log("run-state: current state is '" + FSM.current().getName());



