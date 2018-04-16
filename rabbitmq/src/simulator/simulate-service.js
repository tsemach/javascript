const Broker = require('../broker/broker');

/**
 * @class
 * @constructor define two maps objects
 *      this.tasks: look by the messageId on the incoming task for the message needs to send
 *      this.events: look by the messageId on the incoming event for the message needs to send
 */
class SimulateService  {
    constructor(config) {
        this._name = '';
        this.tasks = new Map();
        this.events = new Map();
        this.broker = new Broker(config);
    }

    get name() {
        return this._name;
    }

    set name(_name) {
        this._name = _name;
    }

    addTaskListener(queue, handler) {
        this.broker.addConsume(queue, handler);
    }

    addEventListener(queue, handler) {
        this.broker.addConsume(queue, handler);
    }

    addTasksMessage(messageId, task) {
        this.tasks.set(messageId, task);
    }

    addEventsMessage(eventId, event) {
        this.events.set(eventId, event);
    }
}

module.exports = SimulateService;
