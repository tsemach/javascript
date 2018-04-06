#!/usr/bin/env node

/**
 * usage:  ./rabbitmq_broker_receive.js <queue-name> <route key>
 *  for example: ./rabbitmq_broker_receive.js topic.queue '#'
 */

const amqp = require('amqplib');
const basename = require('path').basename;
const all = require('bluebird').all;
const Promise = require('bluebird');
const config = require('./rabbitmq_broker_config');

const queue_name = process.argv.slice(2)[0];
const keys = process.argv.slice(3);
if (keys.length < 1) {
    console.log('Usage: %s pattern [pattern...]',
        basename(process.argv[1]));
    process.exit(1);
}

class Broker {

    constructor() {
        this.name = "tsemach";
        this.ch = NaN;
    }

    init() {
        amqp.connect('amqp://172.17.0.2').then(this.initCB.bind(this));
    }

    initConsumeCB(queue) {
        console.log("initConsumeCB: queue = " + JSON.stringify(queue));
        function logMessage(msg) {
            console.log(" [x] %s:'%s'",
                msg.fields.routingKey,
                msg.content.toString());
            console.log("msg = %s", JSON.stringify(msg));
        }
        return this.ch.consume(queue[0], logMessage, {noAck: true});
    }

    initBindCB(b) {
        return this.ch.bindQueue(b.target, b.exchange, b.keys).then(() => {return b.target});
    }

    initQueuesCB() {
        console.log("initQueuesCB is called");

        let initQueue = function (q_created) {
            console.log("initQueue: q = " +  JSON.stringify(q_created));
            let needed_binding = config.binding.filter((b) => {if (b.target === q_created.queue) return b;});

            return Promise.all(needed_binding.map(this.initBindCB.bind(this))).then(this.initConsumeCB.bind(this))
        };

        let createQueue = function(q) {
            console.log("createQueue: q name is " + q.name);
            return this.ch.assertQueue(q.name, q.options).then(initQueue.bind(this));
        };

        return Promise.all(config.queues.map((q) => createQueue.bind(this)(q)));
    }

    initExchangesCB(ch) {
        this.ch = ch;
        config.exchanges.map((ex) => {console.log("got ex = %s", JSON.stringify(ex))});

        return Promise.all(config.exchanges.map((ex) => {ch.assertExchange(ex.name, ex.type, ex.options)}))
            .then(() => {
                console.log("init exchanges ok");
            })
            .catch((err) => {console.log(err)});
    };

    initCB(conn) {
        console.log('connect ok!');

        process.once('SIGINT', function () {
            conn.close();
        });

        let isok = conn.createChannel().then(this.initExchangesCB.bind(this));

        return isok.then(this.initQueuesCB.bind(this));
     }
}

new Broker().init();

