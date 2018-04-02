'use strict'

function connect() {
    return new Promise(function(resolve, rejact) {
        // this function is called immediatly whenp promise is construct
        console.log("connect: promise constructor function is called");
        for (let i = 0; i < 5000000000; i++);
        resolve(true);
    })
}

class Reader {
    constructor() {
        let me = this;        
        this.isok = false;

        console.log("Reader:constructor: is called .. isok = " + this.isok);        
        this.isOkPromise = new Promise(function(resolve, reject) {
            connect().then((res) => {
                console.log("Reader:connect promise is called");
                me.isok = true;
                resolve(me);
            });
        });
    }

    getReaderPromise() {
        return this.isOkPromise;
    }

    id() {
        console.log("Reader:id() I am reader class - " + this.isok);
    }
}

let reader = new Reader();
reader.getReaderPromise().then((r) => {
    console.log("reader connected (ready)");

    r.id();
});

