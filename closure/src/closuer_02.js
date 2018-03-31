
function celebrityID(a, b) {
    console.log("celebrityID called ...");
    // we are returning an object with some inner functions​
    // all the inner functions have access to the outer function's variables​
    var celebrityID = 999;

    return {
        getId: function () {
            // this inner function will return the UPDATED celebrityID variable​
            // it will return the current value of celebrityID, even after the changeTheID function changes it​
            return celebrityID;
        },
        setId: function (id) {
            // this inner function will change the outer function's variable anytime​
            return celebrityID = id;
        },
        print() {
            console.log("a = " + a + ", b = " + b);
        }
    }
}

var mj = celebrityID("Michel", "Jekson");
console.log(mj.getId());      // 999​
console.log(mj.setId(567));   // changes the outer function's variable​
console.log(mj.getId());      // 567: It returns the updated celebrityId variable
mj.print();
