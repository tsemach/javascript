
const broker = require('../broker/broker');

class Recorder {
    constructor() {
        this.ison = false;
        broker.addConsume("work.tasks.queue", this.tasksCB.bind(this));
        broker.addConsume("work.events.queue", this.eventsCB.bind(this));
    }

    record(ison) {
        this.ison = ison;
    }

    tasksCB(msg) {
        if ( ! this.ison ) { return }

        console.log(" [x] [%s]: tasksCB: %s:'%s'",
            msg.properties.headers.messageId,
            msg.fields.routingKey,
            msg.content.toString());
        console.log("msg = %s", JSON.stringify(msg));
    }

    eventsCB(msg) {
        if ( ! this.ison ) { return }

        console.log(" [x] [%s]: eventsCB %s:'%s'",
            msg.properties.headers.messageId,
            msg.fields.routingKey,
            msg.content.toString());
        console.log("msg = %s", JSON.stringify(msg));
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