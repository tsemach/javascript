
require('dotenv').config();

const brokerConfig = require('./recorder_broker_config');
const Broker = require('../broker/broker');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: process.env.DB_DIALECT,
});

const Session = sequelize.import('../../models/session');

class Recorder {
    constructor() {
        this.ison = false;
        this.broker = new Broker(brokerConfig);
        this.broker.addConsume("work.tasks.queue", this.tasksCB.bind(this));
        this.broker.addConsume("work.events.queue", this.eventsCB.bind(this));
    }

    record(ison) {
        this.ison = ison;
    }

    tasksCB(msg) {
        if ( ! this.ison ) { return }

        console.log("tasksCB: [%s]: tasksCB: %s:'%s'",
            msg.properties.headers.messageId,
            msg.fields.routingKey,
            msg.content.toString());
        console.log("tasksCB: [%s] msg = %s", msg.properties.headers.messageId, JSON.stringify(msg));
        console.log("tasksCB: [%s] queue = %s", msg.properties.headers.messageId, msg.fields.consumerTag);

        // write the task into the database, zero event_md5 meaning the event for that task is not arrive yet
        let session = Session.build({
            user: 'tsemach',
            task: JSON.stringify(msg),
            task_md5: msg.properties.headers.messageId,
            task_queue: msg.properties.headers.source,
            event: "{}",
            event_md5: "00000000000000000000000000000000"
        });
        session.save()
            .then(function() {
                console.log("tasksCB: [%s] session wrote to db ok", msg.properties.headers.messageId);
            })
            .catch(what => console.log("tasksCB: [%s] Ooops! .. something bad happen - %s", msg.properties.headers.messageId, what));
    }

    eventsCB(msg) {
        if ( ! this.ison ) { return }

        // temporary: need to replace by promise. of the write of the msg in the taskCB happen *too fast* then the
        // data will not be ready for ready and update the event of that specific task
        setTimeout(function() {
            Session.findOne({
                where: {
                    task_md5: msg.properties.headers.messageId
                }
            }).then(function(session) {
                console.log("eventCB: [%s] session = %s", msg.properties.headers.messageId, JSON.stringify(session));
                session.event = JSON.stringify(msg);
                session.event_md5 = msg.properties.headers.messageId;
                session.event_queue = msg.properties.headers.source;
                session.save()
                    .then(function() {
                        console.log("eventCB: [%s] session wrote to db ok", msg.properties.headers.messageId);
                    })
                    .catch(what => console.log("eventCB: [%s] Ooops! .. something bad happen - %s", msg.properties.headers.messageId, what));
            });

        }, 1000);

        console.log("eventCB: [%s]: eventsCB %s:'%s'",
            msg.properties.headers.messageId,
            msg.fields.routingKey,
            msg.content.toString());
        console.log("eventCB: [%s] msg = %s", msg.properties.headers.messageId, JSON.stringify(msg));
    }
}

module.exports = new Recorder();

/*
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
*/