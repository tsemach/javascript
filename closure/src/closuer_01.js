
function doit(a, b) {
    console.log("doit called ...");
    var doit_a = a + " from doit_a";
    var doit_b = b + " from doit_b";

    function inner_do(inner_a, inner_b) {
        console.log("doit_a = " + doit_a, "inner_a = " + inner_a);
        console.log("doit_b = " + doit_b, "inner_b = " + inner_b);

        return "stam";
    }

    return inner_do;
}

var c1 = doit("me", "you");
console.log(c1("us", "them"));
console.log("");

var c2 = doit("us", "them");
c2("us", "them");
console.log("");

var c3 = doit("one", "two");
c3("us", "them");
console.log("");
