
var Animal = require('./animal');

class Rabbit extends Animal {

    constructor(name, earLength) {
        super(name);
        this.earLength = earLength;
    }

}

module.exports = new Rabbit("Rabbit", 20);