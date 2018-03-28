'use strict'
const fs = require('fs');

function create() {
    return new Promise(function (resolve, reject) {
        // this function is called immediately can Promise is construct
        console.log("promise constructor function is called");
        resolve(4);
    })
}

function doit1(value) {
    console.log("doit1 called: value is " + value);
    for (let i = 0; i < 1000000000; i++);
}

function doit2(value) {
    console.log("doit2 called: value is " + value);
}

let p = create();
console.log("after create p");
for (let i = 0; i < 1000000000; i++);

p.then(doit1);

p.then(doit2);


