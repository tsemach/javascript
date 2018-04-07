#!/usr/bin/env node

/**
 * usage:  ./broker_receive.js <queue-name> <route key>
 *  for example: ./broker_receive.js topic.queue '#'
 */

const amqp = require('amqplib');
const basename = require('path').basename;
const all = require('bluebird').all;

const queue_name = process.argv.slice(2)[0];
const keys = process.argv.slice(3);
if (keys.length < 1) {
    console.log('Usage: %s pattern [pattern...]',
        basename(process.argv[1]));
    process.exit(1);
}

amqp.connect('amqp://172.17.0.2').then(function(conn) {
    process.once('SIGINT', function() {
        conn.close();
    });

    return conn.createChannel().then(function(ch) {
        let ex = 'topic_logs';
        let ok = ch.assertExchange(ex, 'topic', {durable: false});

        ok = ok.then(function() {
            return ch.assertQueue(queue_name, {exclusive: true});
        });

        ok = ok.then(function(qok) {
            let queue = qok.queue;

            return all(keys.map(function(rk) {
                ch.bindQueue(queue, ex, rk);
            })).then(function() {
                return queue;
            });
        });

        ok = ok.then(function(queue) {
            console.log("before consume: queue = " + queue);
            console.log("before consume: type of queue = " + typeof queue);
            return ch.consume(queue, logMessage, {noAck: true});
        });
        return ok.then(function() {
            console.log(' [*] Waiting for logs. To exit press CTRL+C.');
        });

        function logMessage(msg) {
            console.log(" [x] %s:'%s'",
                msg.fields.routingKey,
                msg.content.toString());
        }
    });
}).catch(console.warn);
