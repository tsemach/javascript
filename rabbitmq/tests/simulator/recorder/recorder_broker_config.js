'use strict'

module.exports = {
    connection: {
        user: process.env.QUEUE_USERNAME,
        pass: process.env.QUEUE_PASSWORD,
        server: process.env.QUEUE_SERVER,
        port: process.env.QUEUE_PORT,
        timeout: 2000,
        name: "rabbitmq"
    },
    exchanges: [
        {name: "service-a.tasks.exchange", type: "topic", options: {publishTimeout: 1000, persistent: true, durable: false}},
        {name: "service-a.events.exchange", type: "topic", options: {publishTimeout: 1000, persistent: true, durable: false}},
        {name: "service-b.tasks.exchange", type: "topic", options: {publishTimeout: 1000, persistent: true, durable: false}},
        {name: "service-b.events.exchange", type: "topic", options: {publishTimeout: 1000, persistent: true, durable: false}}
    ],
    queues: [
        {name: "recorder.tasks.queue", options: {limit: 1000, queueLimit: 1000}},
        {name: "recorder.events.queue", options: {limit: 1000, queueLimit: 1000}},
    ],
    binding: [
        {exchange: "service-a.tasks.exchange", target: "recorder.tasks.queue", keys: "tasks.#"},
        {exchange: "service-a.events.exchange", target: "recorder.events.queue", keys: "events.#"},
        {exchange: "service-b.tasks.exchange", target: "recorder.tasks.queue", keys: "tasks.#"},
        {exchange: "service-b.events.exchange", target: "recorder.events.queue", keys: "events.#"},
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
