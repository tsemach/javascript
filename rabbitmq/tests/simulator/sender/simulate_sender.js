#!/usr/bin/env node

const amqp = require('amqplib');
const utils = require('../../../src/utils/hash');

let senderAPI = function() {

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
        sendTaskAsync: async function() {
            let conn = await amqp.connect('amqp://172.17.0.3');
            let ex = 'work.tasks.exchange';
            key = 'loopback.tasks';

            let ch = await conn.createChannel();

            await ch.assertExchange(ex, 'topic', {durable: false});

            message = 'Hello World! from task queue';
            options.headers.source = ex + ":" + key;

            await ch.publish(ex, key, Buffer.from(message), options);
            console.log(" [%s] Sent %s:'%s'", hash, key, message);

            await ch.close();

            //conn.close();
        },

        sendEventAsync: async function() {

            let conn = await amqp.connect('amqp://172.17.0.3');
            let ex = 'work.events.exchange';
            key = 'tsemach.events';

            let ch = await conn.createChannel();

            await ch.assertExchange(ex, 'topic', {durable: false});

            message = 'Hello World! from event queue';
            options.headers.source = ex + ":" + key;

            ch.publish(ex, key, Buffer.from(message), options);
            console.log(" [%s] Sent %s:'%s'", hash, key, message);
            await ch.close();
            await conn.close();
        },
        sendTask: function() {
            amqp.connect('amqp://172.17.0.3').then(function (conn) {
                return conn.createChannel().then(function (ch) {
                    let ex = 'work.tasks.exchange';
                    let ok = ch.assertExchange(ex, 'topic', {durable: false});
                    return ok.then(function () {

                        key = 'loopback.tasks';
                        message = 'Hello World! from task queue';
                        options.headers.source = ex + ":" + key;

                        ch.publish(ex, key, Buffer.from(message), options);
                        console.log(" [%s] Sent %s:'%s'", hash, key, message);
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
                    let ex = 'work.events.exchange';
                    let ok = ch.assertExchange(ex, 'topic', {durable: false});
                    return ok.then(function () {

                        key = 'tsemach.events';
                        message = 'Hello World! from event queue';
                        options.headers.source = ex + ":" + key;

                        ch.publish(ex, key, Buffer.from(message), options);
                        console.log(" [%s] Sent %s:'%s'", hash, key, message);
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
sender.sendEvent();
