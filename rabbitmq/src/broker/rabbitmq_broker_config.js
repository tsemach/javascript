'use strict'

//const connection_params = require('../../config/rabbitmq/rabbitmq');

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
            {name: "work.tasks.exchange", type: "topic", options: {publishTimeout: 1000, persistent: true, durable: false}},
            {name: "work.events.exchange", type: "topic", options: {publishTimeout: 1000, persistent: true, durable: false}}
        ],
        queues: [
            {name: "work.tasks.queue", options: {limit: 1000, queueLimit: 1000}},
            {name: "work.events.queue", options: {limit: 1000, queueLimit: 1000}}
        ],
        binding: [
            {exchange: "work.tasks.exchange", target: "work.tasks.queue", keys: "loopback.#"},
            {exchange: "work.events.exchange", target: "work.events.queue", keys: "tsemach.#"}
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
