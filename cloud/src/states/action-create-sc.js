'use strict'

var Action = require('./action');
var actionPendingSC = require('./action-pending-sc');
var tenantAPI = require('../tenant/tenantAPI');

class ActionCreateSC extends Action {
    constructor(name) {
        super(name);
        super.add("actionPendingSC", actionPendingSC);
    }

    run() {
        console.log("ActionInit:run: is called ..");
        tenantAPI.createSC();
    }
}

module.exports = new ActionCreateSC("createSC");
