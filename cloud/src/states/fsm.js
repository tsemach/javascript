'use strict'

var actionInit = require("./action-init");

class FSM {
    constructor() {
        this.action = actionInit;
    }

    current() {
        return this.action;
    }

    transit(name) {
        this.action = this.action.get(name);

        return this.action;
    }
}

module.exports = new FSM()