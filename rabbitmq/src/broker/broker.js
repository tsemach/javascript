
const amqp = require('amqplib');
const Promise = require('bluebird');
const config = require('./broker_config');

class Broker {

    constructor() {
        this.ch = NaN;
        this.consumes = new Map();
    }

    addConsume(queue, cb) {
        this.consumes.set(queue, cb);
        this.init();
    }

    initConsumeCB(queue) {
        console.log("initConsumeCB: queue = " + JSON.stringify(queue));
        return this.ch.consume(queue[0], this.consumes.get(queue[0]), {noAck: true});
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
            //return Promise.all(needed_binding.map(this.initBindCB.bind(this)));
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

    init() {
        amqp.connect('amqp://172.17.0.3').then(this.initCB.bind(this));

        return this;
    }
}

if (0) {
    let broker = new Broker();

    broker.addConsume("work.tasks.queue", tasksCB);
    broker.addConsume("work.events.queue", eventsCB);
    broker.init();

    function tasksCB(msg) {
        console.log(" [x] tasksCB: %s:'%s'",
            msg.fields.routingKey,
            msg.content.toString());
        console.log("msg = %s", JSON.stringify(msg));
    }

    function eventsCB(msg) {
        console.log(" [x] eventsCB %s:'%s'",
            msg.fields.routingKey,
            msg.content.toString());
        console.log("msg = %s", JSON.stringify(msg));
    }
}

module.exports = new Broker;