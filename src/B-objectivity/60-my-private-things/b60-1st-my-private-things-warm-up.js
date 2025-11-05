import { assertThat } from '../../j4b1-assert.js'
/**
 * b60-my-private-things
 * Warm up
 *
 * * Reguły:
 * Można dopisywać nowy kod
 * Wariant hard:
 *  - Nie można kasować istniejącego kodu
 * Wariant easy:
 *  - Można skasować / komentować jedną linię kodu
 */

const myGreetingObject = {
	_welcomeMessage: 'Hello there',
	name: 'Roy',
	welcome() {
		return `${this._welcomeMessage} ${this.name} !😃`;
	}
}

const welcomeRoy = myGreetingObject.welcome();

myGreetingObject._welcomeMessage = 'Troll'

myGreetingObject.name = 'Moss';
const welcomeMoss = myGreetingObject.welcome();

myGreetingObject.name = 'Jen';
const welcomeJen = myGreetingObject.welcome();

// #Reguła:
// Nie możesz zmieniać kodu poniżej:
assertThat(
	'Welcome message for Roy should be like: "Hello there... " ',
	expect => expect(welcomeRoy).toBe('Hello there Roy !😃')
)  //=

assertThat(
	'Welcome message for Moss should be like: "Hello there... " ',
	expect => expect(welcomeMoss).toBe('Hello there Moss !😃')
)  //=

assertThat(
	'Welcome message for Jen should be like: "Hello there... " ',
	expect => expect(welcomeJen).toBe('Hello there Jen !😃')
)  //=
