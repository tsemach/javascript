
const messageBuilder = require('../../../src/simulator/message-builder-clouser');
const SimulateService = require('../../../src/simulator/simulate-service');
const config = require('./simulate-service-b-config');

class SimulateServiceB extends SimulateService {

    constructor() {
        super(config.broker);

        this.addTaskListener('service-b.tasks.queue', this.taskCB.bind(this));
        this.addEventListener('service-b.events.queue', this.eventCB.bind(this));

        let message;

        message = messageBuilder();
        message.build('receiver.tasks.exchange', 'tasks.#', "task-1: service-b send task to service-b");
        this.addTasksMessage("task-1", message);

        message = messageBuilder();
        message.build('receiver.events.exchange', 'events.#', "event-1: service-b send event to service-b");
        this.addEventsMessage("event-1", message);
    }

    taskCB(msg) {
        console.log("SimulateServiceB:taskCB: called .. msg = %s", JSON.stringify(msg));
        console.log("SimulateServiceB:taskCB: content = '%s'", msg.content);

        let ms = this.tasks.get("task-1");
        let ex = ms.getExchange();
        let ky = ms.getKey();
        let op = ms.getOptions();
        let by = ms.getMessage();

        this.broker.send(ex, ky, by, op);
    }

    eventCB(msg) {
        console.log("SimulateServiceB:eventkCB: called .. msg = %s", JSON.stringify(msg));
        console.log("SimulateServiceB:eventCB: content = '%s'", msg.content);

        let ms = this.events.get("event-1");
        let ex = ms.getExchange();
        let ky = ms.getKey();
        let op = ms.getOptions();
        let by = ms.getMessage();

        this.broker.send(ex, ky, by, op);
    }
}

module.exports = SimulateServiceB;

