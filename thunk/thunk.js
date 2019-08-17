
function a(a, b) {
console.log(arguments);
}

a(1,2);

function addAsync(x, y, cd) {
	setTimeout(() => {
		cd(x+y);
	}, 1000);
}

function makeTrunk(fn) {
	var args = [].slice.call(arguments,1);
	console.log("IN makeTrunk args = ", args);
	return function(cb) {
		args.push(cb);
		fn.apply(null, args);
	}
}

var thunk = makeTrunk(addAsync, 10, 15);
thunk((sum) => {
	console.log(sum); // 25
});

