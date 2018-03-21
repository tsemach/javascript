'use strict'
const fs = require('fs');

function create() {
    return new Promise(function (resolve, reject) {
        fs.readFile('src/promise_01.js', function (err, text) {
            if (err) {
                reject(err);
            }
            else {     
                resolve(text.toString());
            }
        })
    })
}

create()
.then(function(msg) {
    console.log("then-1: " + msg);

    return "stam";
})
.then(function(msg) {
    console.log("then-2: " + msg);
})
.catch(function(err) {
    console.log(err);
});


