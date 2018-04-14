
const messageBuilder = require('../../../src/simulator/message-builder-clouser');
const SimulateService = require('../../../src/simulator/simulate-service');
const config = require('./simulate-service-a-config');

class SimulateServiceA extends SimulateService {

    constructor() {
        super(config.broker);

        this.addTaskListener('service-a.tasks.queue', this.taskCB.bind(this));
        this.addEventListener('service-a.events.queue', this.eventCB.bind(this));

        let message;

        message = messageBuilder();
        message.build('service-b.tasks.exchange', 'tasks.#', "task-1: service-a send task to service-b");
        this.addTasksMessage("task-1", message);

        message = messageBuilder();
        message.build('service-b.events.exchange', 'events.#', "event-1: service-a send event to service-b");
        this.addEventsMessage("event-1", message);
    }

    taskCB(msg) {
        console.log("SimulateServiceA:taskCB: called .. msg = %s", JSON.stringify(msg));
        console.log("SimulateServiceA:taskCB: content = '%s'", msg.content);

        let ms = this.tasks.get("task-1");
        let ex = ms.getExchange();
        let ky = ms.getKey();
        let op = ms.getOptions();
        let by = ms.getMessage();

        console.log("SimulateServiceA:taskCB: going to send <" + by + "> " + ex + ":" + ky);

        this.broker.send(ex, ky, by, op);
    }

    eventCB(msg) {
        console.log("SimulateServiceA:eventCB: called .. msg = %s", JSON.stringify(msg));
        console.log("SimulateServiceA:eventCB: content = '%s'", msg.content);

        let ms = this.events.get("event-1");
        let ex = ms.getExchange();
        let ky = ms.getKey();
        let op = ms.getOptions();
        let by = ms.getMessage();

        console.log("SimulateServiceA:eventCB: going to send <" + by + "> " + ex + ":" + ky);

        this.broker.send(ex, ky, by, op);
    }
}

module.exports = SimulateServiceA;


