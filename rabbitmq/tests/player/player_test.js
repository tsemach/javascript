const config = require('./player_broker_config');
const MessageBuilderClass = require('../../src/simulator/message-builder-class');
const Player = require('../../src/player/player');

/**
 * example of message saved in the database: {
 *  "fields": {
 *      "consumerTag": "amq.ctag-7F8hqrXubTQo7ZmD8qcriQ",
 *      "deliveryTag": 2,
 *      "redelivered": false,
 *      "exchange": "work.tasks.exchange",
 *      "routingKey": "loopback.tasks"
 *  },
 *  "properties": {
 *      "contentType": "application/json",
 *      "contentEncoding": "utf-8",
 *      "headers": {
 *          "messageId":"0ddb0bae995658e9754bdfbf16747d8d",
 *          "sessionId":"86a84b1330d92e894d54bbe4efcbcb6e",
 *          "source":"work.tasks.exchange:loopback.tasks"
 *      },
 *      "deliveryMode": 1,
 *      "timestamp":1523712307195
 *  },
 *  "content": {
 *      "type":"Buffer","data": "I am a message"
 *  }
 *};
 *
 * @type {Player}
 */

player = new Player(config);

function createAndSaveMessage() {

    let m = MessageBuilderClass("work.tasks.exchange", "loopback.player", "I am player test");


    // clone msg since make changes for debug, keep the original msg.
    let out = Object.assign({}, msg);

    out.content = {data: "string", content: msg.content.toString()};
    console.log("");
    console.log("Recorder:tasksCB: [%s]: tasksCB: %s:'%s'",
        out.properties.headers.messageId,
        out.fields.routingKey,
        out.content.toString());
    console.log("Recorder:tasksCB: [%s] msg = %s", out.properties.headers.messageId, JSON.stringify(out, undefined, 2));
    console.log("Recorder:tasksCB: [%s] queue = %s", out.properties.headers.messageId, out.properties.headers.source);


    let a = {
        "fields": {
                "consumerTag": "amq.ctag-7F8hqrXubTQo7ZmD8qcriQ",
                "deliveryTag": 2,
                "redelivered": false,
                "exchange": "work.tasks.exchange",
                "routingKey": "loopback.tasks"
            },
        "properties": {
            "contentType": "application/json",
            "contentEncoding": "utf-8",
            "headers": {
                "messageId":"0ddb0bae995658e9754bdfbf16747d8d",
                "sessionId":"86a84b1330d92e894d54bbe4efcbcb6e",
                "source":"work.tasks.exchange:loopback.tasks"
            },
            "deliveryMode": 1,
            "timestamp":1523712307195
        },
        "content": {"type":"Buffer","data": "I am a message"}
    };

    // write the task into the database, zero event_md5 meaning the event for that task is not arrive yet
    let session = Session.build({
        task_md5: msg.properties.headers.messageId,
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

player.play(true);


{"fields":
    {"consumerTag":"amq.ctag-7F8hqrXubTQo7ZmD8qcriQ","deliveryTag":2,"redelivered":false,"exchange":"work.tasks.exchange","routingKey":"loopback.tasks"},
    "properties":{"contentType":"application/json","contentEncoding":"utf-8",
        "headers":{"messageId":"0ddb0bae995658e9754bdfbf16747d8d","sessionId":"86a84b1330d92e894d54bbe4efcbcb6e","source":"work.tasks.exchange:loopback.tasks"},
    "deliveryMode":1,"timestamp":1523712307195},
    "content":{"type":"Buffer","data":[72,101,108,108,111,32,87,111,114,108,100,33,32,102,114,111,109,32,116,97,115,107,32,113,117,101,117,101]}}