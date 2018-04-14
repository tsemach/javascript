
const Broker = require('../../../src/broker/broker');

/**
 * @description this module run the broker as a Recevier. It define a configuration object listen to two queues,
 * work.tasks.queue and work.events.queue. this class is a wrapper around the broker waiting for messages come in
 * from both queues and just displaying them on the console.
 *
 * The file broker_send_test.js: is responsible for send messages to those two queues.
 *
 * running: open two terminals and run the following:
 *  1) node  tests/broker/simulate_receive_test.js
 *  2) node tests/broker/broker_send_test.js
 *
 */

let config = {
    connection: {
        user: process.env.QUEUE_USERNAME,
        pass: process.env.QUEUE_PASSWORD,
        server: process.env.QUEUE_SERVER,
        port: process.env.QUEUE_PORT,
        timeout: 2000,
        name: "rabbitmq"
    },
    exchanges: [
        {name: "receiver.tasks.exchange", type: "topic", options: {publishTimeout: 1000, persistent: true, durable: false}},
        {name: "receiver.events.exchange", type: "topic", options: {publishTimeout: 1000, persistent: true, durable: false}}
    ],
    queues: [
        {name: "receiver.tasks.queue", options: {limit: 1000, queueLimit: 1000}},
        {name: "receiver.events.queue", options: {limit: 1000, queueLimit: 1000}}
    ],
    binding: [
        {exchange: "receiver.tasks.exchange", target: "receiver.tasks.queue", keys: "tasks.#"},
        {exchange: "receiver.events.exchange", target: "receiver.events.queue", keys: "events.#"}
    ],
    logging: {
        adapters: {
            stdOut: {
                level: 3,
                bailIfDebug: true
            }
        }
    }
};

class Receiver {
    constructor() {
        this.ison = false;
        this.broker = new Broker(config);
        this.broker.addConsume("receiver.tasks.queue", this.taskCB.bind(this));
        this.broker.addConsume("receiver.events.queue", this.eventsCB.bind(this));
    }

    receive(ison) {
        this.ison = ison;
    }

    taskCB(msg) {
        if ( ! this.ison ) { return }

        msg.content = {data: "string", content: msg.content.toString()};
        console.log("taskCB: [%s]: taskCB %s:'%s'",
            msg.properties.headers.messageId,
            msg.fields.routingKey,
            msg.content.toString());
        console.log("taskCB: [%s] msg = %s", msg.properties.headers.messageId, JSON.stringify(msg));
        console.log("");
    }

    eventsCB(msg) {
        if ( ! this.ison ) { return }

        msg.content = {data: "string", content: msg.content.toString()};
        console.log("eventCB: [%s]: eventsCB %s:'%s'",
            msg.properties.headers.messageId,
            msg.fields.routingKey,
            msg.content.toString());
        console.log("eventCB: [%s] msg = %s", msg.properties.headers.messageId, JSON.stringify(msg));
        console.log("");
    }
}

receiver = new Receiver();
receiver.receive(true);

