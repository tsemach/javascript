#!/usr/bin/env node

var FSM = require('./test_fsm');

// now fine
//let rabbit = new Rabbit("White Rabbit", 10);
console.log("test.js is called");
FSM.current().getName();
