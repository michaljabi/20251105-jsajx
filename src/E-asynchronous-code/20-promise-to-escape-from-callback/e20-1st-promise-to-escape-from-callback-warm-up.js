import { assertThat } from '../../j4b1-assert.js'
/**
 * e20-promise-to-escape-from-callback
 * Warm up
 *
 *
 * * Reguły:
 * - nie możesz zmieniać istniejącego kodu
 * - nie możesz ręcznie przypisywać wartości "Roy" lub "Trenneman" (muszą one pochodzić z promise)
 */

let name = '';
Promise.resolve('Roy')

let lastName = '';
Promise.reject('Trenneman')

// #Reguła:
// Nie można zmieniać kodu poniżej:
assertThat(
	'name should be empty before promise resolve',
	expect => expect(name).toBe('')
)  //=
assertThat(
	'lastName should be empty before promise rejects',
	expect => expect(lastName).toBe('')
)  //=

queueMicrotask(() => {
	assertThat(
		'name should be Roy',
		expect => expect(name).toBe('Roy')
	)  //=
	assertThat(
		'lastName should be Trenneman',
		expect => expect(lastName).toBe('Trenneman')
	)  //=
})


