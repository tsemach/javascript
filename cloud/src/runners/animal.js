
class Animal {

    constructor(name) {
        this.speed = 0;
        this.name = name;
    }

    current() {
        console.log("Animal:current is called");
    }
}


module.exports = Animal;
