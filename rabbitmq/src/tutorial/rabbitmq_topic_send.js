#!/usr/bin/env node

const amqp = require('amqplib');

const args = process.argv.slice(2);
const key = (args.length > 0) ? args[0] : 'info';
const message = args.slice(1).join(' ') || 'Hello World!';

amqp.connect('amqp://172.17.0.2').then(function(conn) {
    return conn.createChannel().then(function(ch) {
        let ex = 'topic_logs';
        let ok = ch.assertExchange(ex, 'topic', {durable: false});
        return ok.then(function() {
            ch.publish(ex, key, Buffer.from(message));
            console.log(" [x] Sent %s:'%s'", key, message);
            return ch.close();
        });
    }).finally(function() { conn.close(); })
}).catch(console.log);