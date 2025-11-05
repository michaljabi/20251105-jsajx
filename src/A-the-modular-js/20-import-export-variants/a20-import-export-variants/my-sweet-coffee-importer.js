// DEFAULT
import coffee from './mocha-coffee-default.js';

// NAMED:
import { coffeeName } from './mocha-coffee-named.js';
import { coffeeName as otherCoffee } from './mocha-coffee-named.js';

// NAMESPACE:
import * as coffees from './mocha-coffee-namespaced.js';

console.log(coffee)
console.log(otherCoffee)

console.log(coffeeName)

console.log(coffees.MOCHA);

console.log(coffees.ESPRESSO);

for(let coffee of Object.values(coffees)) {
	console.log(coffee)
}

for(let coffee of Object.keys(coffees)) {
	console.log(coffee)
}
