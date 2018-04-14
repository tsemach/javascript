
const utils = require('../utils/hash');

let MessageBuilderClouser = function() {
    let _options = {
        persistent: false,
        noAck: true,
        timestamp: Date.now(),
        contentEncoding: "utf-8",
        contentType: "application/json",
        headers: {
            messageId: utils.create_hash(),
            sessionId: utils.create_hash(),
            source: ""
        }
    };

    let _message = null;

    return {
        getOptions: function() {
            return _options;
        },

        getMessage: function () {
            return _message;
        },

        getExchange: function() {
            [ex, _] = _options.headers.source.split(':');
            return ex;
        },

        getKey: function() {
            [_, ky] = _options.headers.source.split(':');
            return ky;
        },

        setOptions: function(keys, value) {
            let target = _options;
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
        },

        build: function (ex, ky, ms) {
            _message = Buffer.from(ms, 'utf8');
            _options.headers.source = ex + ":" + ky;
        }
    }
}

builder = MessageBuilderClouser();
// builder.build('ex', 'ky', "it is me");
//
// console.log(builder.getOptions());
// console.log(builder.getMessage().toString());
// console.log(builder.getKey());
// console.log(builder.getExchange());
// builder.setOptions("headers.stam.me", "tsemach");
// console.log(builder.getOptions());

module.exports = MessageBuilderClouser;
