'use strict'

module.exports = {
    simulate: {
        exchanges: {
            tasks: "service-a.tasks.exchange",
            events: "service-a.events.exchange"
        },
        queues: {
            tasks: "service-a.tasks.queue",
            events: "service-a.events.queue"
        }
    },
    broker: {
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
            {name: "service-a.events.exchange", type: "topic", options: {publishTimeout: 1000, persistent: true, durable: false}}
        ],
        queues: [
            {name: "service-a.tasks.queue", options: {limit: 1000, queueLimit: 1000}},
            {name: "service-a.events.queue", options: {limit: 1000, queueLimit: 1000}}
        ],
        binding: [
            {exchange: "service-a.tasks.exchange", target: "service-a.tasks.queue", keys: "tasks.#"},
            {exchange: "service-a.events.exchange", target: "service-a.events.queue", keys: "events.#"}
        ],
        logging: {
            adapters: {
                stdOut: {
                    level: 3,
                    bailIfDebug: true
                }
            }
        }
    }
};
