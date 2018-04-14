#!/usr/bin/env node

const amqp = require('amqplib');
const utils = require('../../src/utils/hash');

let options = {
	persistent: false,
    noAck: true,
    timestamp: Date.now(),
    contentEncoding: "utf-8",
    contentType: "application/json",
	headers: {
		messageId: utils.create_hash().toString(),
        sessionId: utils.create_hash().toString()
	}
};
function send(ex, ky, ms) {
    amqp.connect('amqp://172.17.0.3').then(function (conn) {
        return conn.createChannel().then(function (ch) {
            let ok = ch.assertExchange(ex, 'topic', {durable: false});
            return ok.then(function () {

                options.headers.source = ex + ":" + ky;

                ch.publish(ex, key, Buffer.from(ms), options);
                console.log(" [x] Sent %s:'%s'", key, ms);

                return ch.close();
            });
        }).finally(function () {
            conn.close();
        })
    }).catch(console.log);
}
//======================================================================================================================

if (0) {
    amqp.connect('amqp://172.17.0.3').then(function (conn) {
        process.once('SIGINT', function () {
            conn.close();
        });

        return conn.createChannel().then(function (ch) {
            let ex = 'work.events.exchange';
            let ok = ch.assertExchange(ex, 'topic', {durable: false});

            ok = ok.then(function () {
                return ch.assertQueue("work.events.queue", {exclusive: true});
            });

            ok = ok.then(function (qok) {
                let queue = qok.queue;

                let keys = ['loopback.tasks'];
                return all(keys.map(function (rk) {
                    ch.bindQueue(queue, ex, rk);
                })).then(function () {
                    return queue;
                });
            });

            ok = ok.then(function (queue) {
                return ch.consume(queue, logMessage, {noAck: true});
            });
            return ok.then(function () {
                console.log(' [*] Waiting for logs. To exit press CTRL+C.');
            });

            function logMessage(msg) {
                console.log(" [x] %s:'%s'",
                    msg.fields.routingKey,
                    msg.content.toString());
                console.log(" [x] msg = %s", msg);
            }
        });
    }).catch(console.warn);

// amqp.connect('amqp://172.17.0.3').then(function(conn) {
//     return conn.createChannel().then(function(ch) {
//         let ex = 'work.events.exchange';
//         let ok = ch.assertExchange(ex, 'topic', {durable: false});
//         return ok.then(function() {
//
// 			key = 'tsemach.events';
// 			message = 'Hello World! from event queue';
//
//             ch.publish(ex, key, Buffer.from(message), options);
//             console.log(" [x] Sent %s:'%s'", key, message);
//             return ch.close();
//         });
//     }).finally(function() { conn.close(); })
// }).catch(console.log);
}
