#!/usr/bin/env node

const amqp = require('amqplib');
const utils = require('../../../src/utils/hash');

let senderAPI = function() {

    let exchange = 'service-a';
    let key;
    let message;
    let hash = utils.create_hash().toString();
    let sessionId = utils.create_hash().toString();
    let options = {
        persistent: false,
        noAck: true,
        timestamp: Date.now(),
        contentEncoding: "utf-8",
        contentType: "application/json",
        headers: {
            messageId: hash,
            sessionId: sessionId,
            source: ""
        }
    };

    return {
        sendTask: function() {
            amqp.connect('amqp://172.17.0.3').then(function (conn) {
                return conn.createChannel().then(function (ch) {
                    let ex = exchange + ".tasks.exchange";
                    let ok = ch.assertExchange(ex, 'topic', {durable: false});
                    return ok.then(function () {

                        key = 'tasks.' + exchange;
                        message = 'from simulate: ' + ex + ":" + key;
                        options.headers.source = ex + ":" + key;

                        ch.publish(ex, key, Buffer.from(message), options);
                        console.log("[%s] Sent %s:'%s'", hash, key, message);

                        return ch.close();
                    });
                }).finally(function () {
                    conn.close();
                })
            }).catch(console.log);

        },

        sendEvent: function() {
            amqp.connect('amqp://172.17.0.3').then(function (conn) {
                return conn.createChannel().then(function (ch) {
                    let ex = exchange + '.events.exchange';
                    let ok = ch.assertExchange(ex, 'topic', {durable: false});
                    return ok.then(function () {

                        key = 'events.' + exchange;
                        message = 'from simulate: ' + ex + ":" + key;
                        options.headers.source = ex + ":" + key;

                        ch.publish(ex, key, Buffer.from(message), options);
                        console.log("[%s] Sent %s:'%s'", hash, key, message);

                        return ch.close();
                    });
                }).finally(function () {
                    conn.close();
                })
            }).catch(console.log);
        }
    }
};

let sender = senderAPI();

sender.sendTask();
//sender.sendEvent();
