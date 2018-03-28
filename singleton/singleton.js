
'use strict'

console.log("singeltom.js require called");

class Singleton {
    constructor(x) {
        console.log("Singelton:constructore called");
        this.x = 5;
    }

    getX() {
        return this.x;
    }
}

module.exports = new Singleton();