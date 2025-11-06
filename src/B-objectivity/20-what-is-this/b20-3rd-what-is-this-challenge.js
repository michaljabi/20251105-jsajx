import { assertThat } from '../../j4b1-assert.js'
/**
 * b20-what-is-this
 * Challenge
 *
 * Napisałem kod, który ma wyświetlić nazwę działu po 2 sekundach.
 * Niestety, nie działa to tak, jak powinno. Nie wiem dlaczego, bo logika wygląda poprawnie.
 * Pomóż mi to naprawić!
 *
 * * Reguły:
 * - Nie możesz usuwać istniejącego kodu
 * - Kodzik możesz modyfikować w środku metody sayNameAfter
 */

let testSpy = '';

class ShowDepartment {

	name = 'IT Department'

	printMyName() {
		return this.name;
	}

	sayNameAfter(seconds = 2) {
	    console.log(this);

		// przed `2015`
		const that = this;
		setTimeout(function () {
		// setTimeout(() => { // arrow function + this normalnie po 2015;
			console.log(that);
			const result = 'This is ' + that.printMyName()
			console.log(result)
			// ten kod poniżej jest potrzebny tylko dla testu (nie zmieniaj go):
			testSpy = result;
		}, seconds * 1000)
	}
}


// #Reguła:
// Nie możesz zmieniać kodu poniżej:
const department = new ShowDepartment();
department.sayNameAfter(2);
department.printMyName() //=

assertThat(
	'department name',
	expect => expect(department.name).toBe('IT Department')
)  //=
assertThat(
	'department should have printMyName method',
	expect => expect(typeof department.printMyName).toBe('function')
)  //=

setTimeout(() => {
	assertThat(
		'spy should have value "This is IT Department" after 2 seconds',
		expect => expect(testSpy).toBe('This is IT Department')
	)  //=
}, 2100)


