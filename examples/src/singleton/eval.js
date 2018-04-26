
class Commands {
    constructor() {

    }

    doit() {
        console.log("Commands:doit is called ..");
    }
}
function f() {
    console.log("I am f");
}

let c = new Commands();

let s = 'c.doit';

let fn = global['f'];
fn()
console.log(typeof fn);