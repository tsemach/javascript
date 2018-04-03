'use strict'

var Action = require('./action');

class ActionPendingSC extends Action {
    constructor(name) {
        super(name);
    }

    run() {
        console.log("ActionPendingSC:run: is called ..");
    }
}

module.exports =  new ActionPendingSC("pendingSC");