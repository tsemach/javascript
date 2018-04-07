#!/usr/bin/env node

const broker = require('../broker/broker');

class Receiver {
    constructor() {
        this.ison = false;
        broker.addConsume("work.events.queue", this.eventsCB.bind(this));
    }

    eventsCB(msg) {
        if ( ! this.ison ) { return }

        console.log("eventCB: [%s]: eventsCB %s:'%s'",
            msg.properties.headers.messageId,
            msg.fields.routingKey,
            msg.content.toString());
        console.log("eventCB: [%s] msg = %s", msg.properties.headers.messageId, JSON.stringify(msg));
    }
}

receiver = new Receiver();

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