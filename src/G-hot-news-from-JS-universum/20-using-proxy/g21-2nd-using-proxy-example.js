/**
 *  Przykład użycia Proxy do logowania zmian w czasie cyklu trwania obiektu
 * */

const person = {
	name: 'Michał'
}

function loggerFactory(object) {

	const logger = [];
	for(const [key, value] of Object.entries(object)) {
		logger.push({ date: new Date().getTime(), key, value, method: 'POST' });
	}
	return new Proxy(object, {
		get ( target, key ) {
			if(key === 'log') {
				return () => logger;
			}
			return Reflect.get(target, key);
		},
		set(target, key, value) {
			if(key !== 'log') {
				const method = Reflect.has(target, key) ? 'UPDATE' : 'POST';
				logger.push({ date: new Date().getTime(), key, value, method});
				Reflect.set(target, key, value);
			}
		}
	})
}

function make200msPass(callback) {
	setTimeout(callback, 200)
}

const captainsLog = loggerFactory(person);

make200msPass(() => {

	captainsLog.name = 'Bob';
	captainsLog.lastName = 'Kowalsky';

	make200msPass(() => {

		captainsLog.age = 22;
		console.log(captainsLog)

		console.log(captainsLog.log())
		// captainsLog.log().forEach((entry) => {
		// 	console.log(entry);
		// })
	})
})


