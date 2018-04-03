'use strict'

/**
 * Action:
 *
 * @child: a collection of actions able to access from this action
 *
 */
class Action {
    constructor(name) {
        this.name = name;
        this.childs = new Map();

        console.log("Action:constructor: constructor is call, name = " + this.name);
    }

    name() {
        return this.name;
    }

    add(name, action) {
        console.log("Action:add: adding action '" + name + "'");
        this.childs.set(name, action);
    }

    get(name) {
        this.childs.get(name);
    }
}

module.exports = Action;