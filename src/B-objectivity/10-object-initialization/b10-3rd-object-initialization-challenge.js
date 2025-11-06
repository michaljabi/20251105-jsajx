import { assertThat } from '../../j4b1-assert.js'

/**
 * b10-object-initialization
 * Challenge
 *
 * Nasz dział IT — musi ubierać się stosownie do pogody.
 * Dodatkowo każda osoba niesie ze sobą 1 dodatkową rzecz.
 *
 * * Reguły:
 * - Kod możesz pisać tylko w wyznaczonym do tego miejscu
 */

/*
function dressUpAccordingToWeather(weatherProvider, props) {
	// #Reguła:
	// Możesz pisać tylko tutaj
	const {name, lastName, has } = props;
	const myUser = {
		name: name,
		lastName: lastName,
		wearing: 'coat'
	}
	console.log(has);
	myUser[has] = true;
	// myUser.duck = true;
	// myUser.mug = true;
	if(weatherProvider === 'sunny') {
		myUser.wearing = 't-shirt'
	}
	return myUser
}
*/

// Jutro: JSDoc - pokaż [TODO]
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters
function dressUpAccordingToWeather(weatherProvider = '', { name, lastName, has } = { name: '', lastName: '', has: 'item'}) {
	return {
		name,
		lastName,
		//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator
		wearing: weatherProvider === 'sunny' ? 't-shirt' : 'coat',
		[has]: true
	}
}


const person1 = dressUpAccordingToWeather('windy', { name: 'Jen', lastName: 'Barber', has: 'keys' })
const person2 = dressUpAccordingToWeather('sunny', { name: 'Maurice', lastName: 'Moss', has: 'duck' })
const person3 = dressUpAccordingToWeather('cloudy', { name: 'Roy', lastName: 'Trenneman', has: 'mug' })

// #Reguła:
// Nie możesz zmieniać kodu poniżej:
assertThat(
	'person1 is Jen Barber',
	expect => expect(person1.name + ' ' + person1.lastName).toBe('Jen Barber')
)  //=
assertThat(
	'she has keys',
	expect => expect(person1.keys).toBe(true)
)  //=
assertThat(
	'she wears coat',
	expect => expect(person1.wearing).toBe('coat')
)  //=
//----------
assertThat(
	'person2 is Maurice Moss',
	expect => expect(person2.name + ' ' + person2.lastName).toBe('Maurice Moss')
)  //=
assertThat(
	'he has duck',
	expect => expect(person2.duck).toBe(true)
)  //=
assertThat(
	'he wears t-shirt',
	expect => expect(person2.wearing).toBe('t-shirt')
)  //=
//----------
assertThat(
	'person3 is Roy Trenneman',
	expect => expect(person3.name + ' ' + person3.lastName).toBe('Roy Trenneman')
)  //=
assertThat(
	'he has mug',
	expect => expect(person3.mug).toBe(true)
)  //=
assertThat(
	'he has wears coat',
	expect => expect(person3.wearing).toBe('coat')
)  //=
