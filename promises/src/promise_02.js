'use strict'
const fs = require('fs');

function create() {
    return new Promise(function (resolve, reject) {
        // this function is called immediately can Promise is construct
        console.log("promise constructor function is called");
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

let p = create();
console.log("after create p");
p.then(function(msg) {
    console.log("then-1: " + msg);

    return "stam";
})
.then(function(msg) {
    console.log("then-2: " + msg);
})
.catch(function(err) {
    console.log(err);
});


