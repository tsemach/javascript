/**
 * from: https://github.com/squaremo/amqp.node/blob/master/examples/tutorials/send.js
 */

var amqp = require('amqplib');

amqp.connect('amqp://172.17.0.3').then(function(conn) {
    return conn.createChannel().then(function(ch) {
        var q = 'hello';
        var msg = 'Hello World!';

        var ok = ch.assertQueue(q, {durable: false});

        return ok.then(function(_qok) {
            // NB: `sentToQueue` and `publish` both return a boolean
            // indicating whether it's OK to send again straight away, or
            // (when `false`) that you should wait for the event `'drain'`
            // to fire before writing again. We're just doing the one write,
            // so we'll ignore it.
            ch.sendToQueue(q, Buffer.from(msg));
            console.log(" [x] Sent '%s'", msg);

            return ch.close();
        });
    }).finally(function() {
        conn.close();
    });
}).catch(console.warn);