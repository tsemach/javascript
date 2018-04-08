
require('dotenv').config();

const Sequelize = require('sequelize');
const Broker = require('../broker/broker');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: process.env.DB_DIALECT,
});

const Session = sequelize.import('../../models/session');

/**
 * @class Player: player is "setting" on a task queue/s and send event according the upcoming task.
 * The decision which event will be sent according to each receiving task can be among several conditions:
 * 1) send event match the msg.properties.headers.messageId
 */
class Player {
    constructor(config) {
        this.ison = false;
        this.broker = new Broker(config);
        this.broker.addConsume("work.tasks.queue", this.tasksCB.bind(this));
    }

    play(ison) {
        this.ison = ison;
    }

    tasksCB(msg) {
        if ( ! this.ison ) { return }

        console.log("Player:tasksCB: [%s]: tasksCB: %s:'%s'",
            msg.properties.headers.messageId,
            msg.fields.routingKey,
            msg.content.toString());
        console.log("Player:tasksCB: [%s] msg id = %s", msg.properties.headers.messageId, JSON.stringify(msg));

        // find the event follow by msg.properties.headers.messageId and push the event to event queue.
        let taskIsReadCB = function(session) {
            console.log("Player:tasksCB: [%s] session = %s", msg.properties.headers.messageId, JSON.stringify(session));
            // load session from database according to msg.properties.headers.messageId
            // now send it to event queue use this.sendEvent method
            this.sendEvent(session);
        }.bind(this);

        Session.findOne({
            where: {
                task_md5: msg.properties.headers.messageId
            }
        }).then(function(session) {
            console.log("Player:tasksCB: [%s] session = %s", msg.properties.headers.messageId, JSON.stringify(session));
            taskIsReadCB(session);
        });
    }

    sendEvent(session) {
        if (!this.ison) {
            return
        }

        // session is ready to sent to event queue by broker.
        // the exchange/key is determine by the session.event_source field.
        let source = session.event_queue.split(':');
        this.broker.send(source[0], source[1], session.event);
    }
}

module.exports = new Player();
