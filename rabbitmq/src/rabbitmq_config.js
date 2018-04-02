'use strict'

const connection_params = require('../config/rabbitmq/rabbitmq');

module.exports = () => {
    const settings = {
        connection: {
            ...connection_params,
            timeout: 2000,
            name: "rabbitmq"
        }
        exchanges: [
            {name: "work.exchange", type: "topic", publishTimeout: 1000, persistent: true, durable: false}
        ],
        queues: [
            {name: "work.queue", limit: 1000, queueLimit: 1000}
    ]
    }
}