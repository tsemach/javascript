'use strict'

function fetchX(callme) {
	console.log("fetchX called");
	callme(2);
}

function fetchY(callme) {
	console.log("fetchY called");
	callme(4);
}

function add(getX, getY, cb) {
	var x, y;
	console.log("add call " + getX);
	getX(function(xVal){
		console.log("getX: xVal = " + xVal);
		x = xVal;
		// both are ready?
		if (y != undefined) {
			cb( x + y );	// send along sum
		}
	} );
	getY(function(yVal) {
		console.log("getY: yVal = " + yVal);
		y = yVal;
		// both are ready?
		if (x != undefined) {
			cb( x + y );	// send along sum
		}
	} );
}

// `fetchX()` and `fetchY()` are sync or async
// functions
add(fetchX, fetchY, function(sum) {
	console.log(sum); // that was easy, huh?
});

