#!/usr/bin/env node

var amqp: any;
amqp = require('amqplib/callback_api');

class Rabbitmq {
    channel: any;
    conn: any;
    queue: string;

    constructor() {
        this.channel = null;
        this.conn = null;
        this.queue = "";
    }

    public connect(name: string): void {
        this.queue = name;
        let me = this;
        console.log("rabbitmq: connect is called");

        amqp.connect('amqp://localhost', function (err, conn) {
            console.log("ampq: connect is called");
            me.conn = conn;
            conn.createChannel(function (err, ch) {
                console.log("ampq: createChannel callback is called");
                ch.assertQueue(name, {durable: false});
                me.channel = ch;
                me.send();
            });
        });
    }

    public send() {
        console.log("Rabbitmq:send is called");
        let msg = 'Hello World!';

        // note: on node 6 Buffer.from(msg) should be used
        this.channel.sendToQueue(this.queue, new Buffer(msg));
        console.log("[x] Sent %s", msg);
    }

    public receive() {
        let me = this;

        try {
            me.channel.assertQueue(this.queue, {durable: false});
        }
        catch (ex) {
            console.log("receive: " + ex);
        }

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", this.queue);
        me.channel.consume(me.queue, function(msg) {
            me._print_msg(msg);
            console.log(" [x] Received %s", msg.content.toString());
        }, {noAck: true});

        //
        // amqp.connect('amqp://localhost', function(err, conn) {
        //     conn.createChannel(function(err, ch) {
        //         var q = 'hello';
        //
        //         ch.assertQueue(q, {durable: false});
        //
        //         console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
        //         ch.consume(q, function(msg) {
        //             console.log(" [x] Received %s", msg.content.toString());
        //         }, {noAck: true});
        //     });
        // });
    }

    public _print_msg(msg: any) {
        console.log(" [x] Received %s", msg.content.toString());
    }

    public close() {
        this.conn.close();
    }
}

export default new Rabbitmq();
