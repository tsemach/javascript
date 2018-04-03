'use strict'

console.log("action-init: current working directory - " + __dirname);

var Action = require('./action');
var actionCreateSC = require('./action-create-sc');

class ActionInit extends Action {
    constructor(name) {
        super(name);
        super.add("actionCreateSC", actionCreateSC);
    }

    run() {
        console.log("ActionInit:run: is called ..");
        tenantAPI.createSC();
    }
}

module.exports = new ActionInit("init");
