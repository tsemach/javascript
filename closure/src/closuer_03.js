/**
 * from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
 *
 * Emulating private methods with closures
 * Languages such as Java provide the ability to declare methods private,
 * meaning that they can only be called by other methods in the same class.
 *
 * JavaScript does not provide a native way of doing this, but it is possible to emulate private methods using closures.
 * Private methods aren't just useful for restricting access to code:
 * they also provide a powerful way of managing your global namespace,
 * keeping non-essential methods from cluttering up the public interface to your code.
 *
 * The following code illustrates how to use closures to define public functions that can access private functions and variables.
 * Using closures in this way is known as the module pattern
 */

var makeCounter = function() {
    var privateCounter = 0;

    // private method
    function changeBy(val) {
        privateCounter += val;
    }

    return {
        increment: function() {
            changeBy(1);
        },
        decrement: function() {
            changeBy(-1);
        },
        value: function() {
            return privateCounter;
        }
    }
};

var counter1 = makeCounter();
var counter2 = makeCounter();
console.log(counter1.value()); /* Alerts 0 */
counter1.increment();
counter1.increment();
console.log(counter1.value()); /* Alerts 2 */
counter1.decrement();
console.log(counter1.value()); /* Alerts 1 */
console.log(counter2.value()); /* Alerts 0 */