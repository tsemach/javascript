
const utils = require('../../src/utils/hash');

class MessageBuilder {

    constructor() {
        this._message = null;
        this._options = {
            persistent: false,
            noAck: true,
            timestamp: Date.now(),
            contentEncoding: "utf-8",
            contentType: "application/json",
            headers: {
                messageId: "",
                sessionId: "",
                source: ""
            }
        };
    }

    getOptions() {
        return this._options;
    }

    options(keys, value) {
        let target = this._options;
        keys = keys.split('.');
        keys.forEach(function(key, index) {
            if (index === keys.length - 1) {
                target[key] = value;
            }
            else {
                target = target[key];
            }
        });
    }

    getMessage(isBuffered = false) {
        if (isBuffered) {
            return Buffer.from(this._message);
        }
        return this._message;
    }

    message(message) {
        this.message = message;
    }

}

module.exports = MessageBuilder;
