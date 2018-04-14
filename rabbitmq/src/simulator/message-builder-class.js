
const utils = require('../../src/utils/hash');

class MessageBuilderClass {

    constructor(ex, ky, ms) {
        this._ex = ex;
        this._ky = ky;
        this._message = ms;
        this._options = {
            persistent: false,
            noAck: true,
            timestamp: Date.now(),
            contentEncoding: "utf-8",
            contentType: "application/json",
            headers: {
                messageId: utils.create_hash(),
                sessionId: utils.create_hash(),
                source: ex+":"+ky,
            }
        };
    }

    getOptions() {
        return this._options;
    }

    setOptions(keys, value) {
        let target = this._options;
        keys = keys.split('.');
        keys.forEach(function(key, index) {
            if ( ! (key in target) ) {
                if ( index === keys.length - 1) {
                    target[key] = value;
                }
                else {
                    target[key] = {};
                    target = target[key];
                }
            } else {
                if (index === keys.length - 1) {
                    target[key] = value;
                }
                else {
                    target = target[key];
                }
            }
        });
    }

    getMessage(isBuffered = false) {
        if (isBuffered) {
            return Buffer.from(this._message);
        }
        return this._message;
    }

    setMessage(message) {
        this.message = message;
    }

    getExchange() {
        [ex, _] = _options.headers.source.split(':');
        return ex;
    }

    getKey() {
        [_, ky] = _options.headers.source.split(':');
        return ky;
    }
}

// m = new MessageBuilderClass('work', 'event.#', "it is me message");
//
// m.setOptions('headers.exchdange', 'work.ex');
// m.setOptions('headers.exchange.stam', 'work.ex');
// console.log(m.getOptions());

module.exports = MessageBuilderClass;
