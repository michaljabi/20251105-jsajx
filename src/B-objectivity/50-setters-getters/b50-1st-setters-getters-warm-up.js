import { assertThat } from '../../j4b1-assert.js'
/**
 * b50-setters-getters
 * Warm up
 *
 * * Reguły:
 * - Nie można zmieniać kodu nigdzie, poza instancją - wnętrzem `person`
 */
const person = {
	// #Reguła:
	// Kodzik można pisać tylko tutaj w środku.
	name: 'Janusz',
	lastName: 'Kowalski',
	get email() {
		return ([this.name, this.lastName].join('.') + '@workload.com').toLowerCase()
	},
	get fullName() {
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing
		return [this.name, this.lastName ?? '-'].join(' ').trim()
	},
	set fullName(value) {
		console.log(value);
		console.log(value.split(' '));
		const [name, lastName] = value.split(' ');
		this.name = name;
		this.lastName = lastName;
		// this.fullName = value;
	}
}

person.fullName = 'Janusz Kowalski'
console.log(person.name)
console.log(person.lastName)

person.fullName //=

// #Reguła:
// Nie możesz zmieniać kodu poniżej:
assertThat(
	'Person name + lastName should be Janusz Kowalski',
	expect => expect([person.name, person.lastName].join(' ')).toBe('Janusz Kowalski')
)  //=
assertThat(
	'Person email should be janusz.kowalski@workload.com',
	expect => expect(person.email).toBe('janusz.kowalski@workload.com')
)  //=
// Po zmianie imienia i nazwiska powinien zmienić się email:
person.name = 'Grażyna';
person.lastName = 'Nowak';
assertThat(
	'Person email from now - should be grażyna.nowak@workload.com',
	expect => expect(person.email).toBe('grażyna.nowak@workload.com')
)  //=

console.log(person.email);

person.fullName //=