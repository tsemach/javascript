'use strict'


var rabbit = require('./rabbit');


class FSM {
    constructor() {
        this.action = rabbit;
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