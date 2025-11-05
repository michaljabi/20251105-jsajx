// DEFAULT
import coffee from './mocha-coffee-default';

// NAMED:
import { coffeeName } from './mocha-coffee-named';
import { coffeeName as otherCoffee } from './mocha-coffee-named';

// NAMESPACE:
import * as coffees from './mocha-coffee-namespaced';

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
