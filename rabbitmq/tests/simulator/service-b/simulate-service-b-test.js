
const messageBuilder = require('../../../src/simulator/message-builder-clouser');
const SimulateService = require('../../../src/simulator/simulate-service');
const config = require('./simulate-service-b-config');

class SimulateServiceB extends SimulateService {

    constructor() {
        super(config.broker);
        this.name = 'service-b';

        this.addTaskListener('service-b.tasks.queue', this.taskCB.bind(this));
        this.addEventListener('service-b.events.queue', this.eventCB.bind(this));

        let message;

        message = messageBuilder('service-b');
        message.build('receiver.tasks.exchange', 'tasks.#', "task-1: service-b send task to receiver");
        this.addTasksMessage("task-1", message);

        message = messageBuilder('service-b');
        message.build('service-a.events.exchange', 'events.#', "event-1: service-b send event to service-a");
        this.addEventsMessage("event-1", message);
    }

    taskCB(msg) {
        console.log("SimulateServiceB:taskCB: called .. msg = %s", JSON.stringify(msg));
        console.log("SimulateServiceB:taskCB: content = '%s'", msg.content);

        // send task to receiver
        let ms = this.tasks.get("task-1");
        ms.addOpaque(msg.properties.headers.opaque);

        let ex = ms.getExchange();
        let ky = ms.getKey();
        let op = ms.getOptions();
        let by = ms.getMessage();

        console.log("SimulateServiceB:taskCB: going to send <" + by + "> " + ex + ":" + ky);

        this.broker.send(ex, ky, by, op);
    }

    eventCB(msg) {
        console.log("SimulateServiceB:eventCB: called .. msg = %s", JSON.stringify(msg));
        console.log("SimulateServiceB:eventCB: content = '%s'", msg.content);

        let ms = this.events.get("event-1");
        ms.addOpaque(msg.properties.headers.opaque);
        ms.adjustMessageId('service-a');

        let ex = ms.getExchange();
        let ky = ms.getKey();
        let op = ms.getOptions();
        let by = ms.getMessage();


        console.log("SimulateServiceB:eventCB: going to send <" + by + "> " + ex + ":" + ky);

        this.broker.send(ex, ky, by, op);
    }
}

module.exports = SimulateServiceB;

