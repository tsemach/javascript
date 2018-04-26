
require('dotenv').config();

const Broker = require('../broker/broker');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: process.env.DB_DIALECT,
});

const Session = sequelize.import('../../models/session');

class Recorder {
    constructor(config) {
        this.ison = false;
        this.broker = new Broker(config);
    }

    record(ison) {
        this.ison = ison;
    }

    addTaskListener(queue) {
        this.broker.addConsume(queue, this.tasksCB.bind(this));
    }

    addEventListener(queue) {
        this.broker.addConsume(queue, this.eventsCB.bind(this));
    }

    tasksCB(msg) {
        if ( ! this.ison ) { return }

        // clone msg since make changes for debug, keep the original msg.
        let out = Object.assign({}, msg);

        out.content = {data: "string", content: msg.content.toString()};
        console.log("");
        console.log("Recorder:tasksCB: [%s]: called: %s",
            out.properties.headers.messageId,
            out.fields.routingKey);
        console.log("Recorder:tasksCB: [%s] msg = %s", out.properties.headers.messageId, JSON.stringify(out, undefined, 2));
        console.log("Recorder:tasksCB: [%s] queue = %s", out.properties.headers.messageId, out.properties.headers.source);

        let from = msg.fields.exchange.split('.')[0];

        // write the task into the database, zero event_md5 meaning the event for that task is not arrive yet
        let session = Session.build({
            //task_md5: msg.properties.headers.messageId,
            task_md5: msg.properties.headers.opaque[from].messageId,
            sessionId: msg.properties.headers.sessionId,
            user: 'tsemach',
            task: JSON.stringify(msg),
            task_queue: msg.properties.headers.source,
            event: "{}",
            event_md5: "00000000000000000000000000000000"
        });
        session.save()
            .then(function() {
                console.log("Recorder:tasksCB: [%s] session wrote to db ok\n", msg.properties.headers.messageId);
            })
            .catch(what => console.log("Recorder:tasksCB: [%s] Ooops! .. something bad happen - %s", msg.properties.headers.messageId, what));
    }

    eventsCB(msg) {
        if ( ! this.ison ) { return }

        // clone msg since make changes for debug, keep the original msg.
        let out = Object.assign({}, msg);

        out.content = {data: "string", content: msg.content.toString()};

        let from = msg.fields.exchange.split('.')[0];

        // temporary: need to replace by promise. of the write of the msg in the taskCB happen *too fast* then the
        // data will not be ready for ready and update the event of that specific task
        setTimeout(function() {
            Session.findOne({
                where: {
                    task_md5: msg.properties.headers.messageId
                }
            }).then(function(session) {
                console.log("");
                console.log("Recorder:eventCB: [%s-%s] session = %s\n", out.properties.headers.sessionId, msg.properties.headers.messageId, JSON.stringify(session));
                session.event = JSON.stringify(msg);
                //session.event_md5 = msg.properties.headers.messageId;
                session.event_md5 = msg.properties.headers.opaque[from].messageId;
                session.event_queue = msg.properties.headers.source;
                session.save()
                    .then(function() {
                        console.log("Recorder:eventCB: [%s-%s] session wrote to db ok", out.properties.headers.sessionId, msg.properties.headers.messageId);
                    })
                    .catch(what => console.log("Recorder:eventCB: [%s] Ooops! .. something bad happen - %s", msg.properties.headers.messageId, what));
            });

        }, 1000);

        console.log("");
        console.log("Recorder:eventCB: [%s-%s]: eventsCB %s:'%s'",
            out.properties.headers.sessionId,
            out.properties.headers.messageId,
            out.fields.routingKey,
            out.content.toString());
        console.log("Recorder:eventCB: [%s] msg = %s", out.properties.headers.messageId, JSON.stringify(out, undefined, 2));
        console.log("");
    }
}

module.exports = Recorder;
