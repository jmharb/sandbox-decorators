const { logger, deprecate, time } = require('./decorators');

class DecoratorExample {
	doSomething(i) {
		return  Math.random * i;
	}
	@deprecate('This is a custom message')
	@time
	testing() {
		for (let i = 0; i < 1000000; ++i) {
			this.doSomething(i);
		}
	}
	@logger
	loggingTest() {
		console.log('Internal loggingTest');
	}
}
const t = new DecoratorExample();

t.testing();
t.loggingTest();