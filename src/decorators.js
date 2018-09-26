function logger(target, name, descriptor) {
	// obtain the original function
	const fn = descriptor.value;

	// wrap original function
	const newFn = function () {
		console.log('Start: %s...', name);
		fn.apply(target, arguments);
		console.log('End: %s', name);
	};

	// Update the original function with the wrapped function
	descriptor.value = newFn;
	return descriptor;
}

function time(target, name, descriptor) {
	const fn = descriptor.value;

	const newFn = function() {
		const startTime = Date.now();
		fn.apply(this, arguments);
		const endTime = (Date.now() - startTime) / 1000;
		console.log(`Time: ${name} - ${endTime}s`);
	}
	descriptor.value = newFn;
	return descriptor;
}

/*
 * Create a paramatorized decorator.
 * Allows for @decorator(<message>)
 */
function deprecate(msg) {
	return function _deprecate(target, name, descriptor) {
		const fn = descriptor.value;
		const newFn = function() {
			const message = msg || `The method '${name}' has been depricated`;
			console.warn(`DEPRECATION ${target.constructor.name}.${name}(): ${message}`);
			fn.apply(this, arguments);
		}
		descriptor.value = newFn;
		return descriptor;
	}
}

module.exports = {
	time,
	logger,
	deprecate
}