import { assertThat, fireCount } from '../../j4b1-assert.js'
/**
 * e10-simplest-async
 * Warm up
 *
 * Dwie osoby zwróciły się po zwrot swoich należności,
 * jedna z nich powinna dostać aż 2-krotny zwrot
 *
 * * Reguły:
 * - nie możesz usuwać istniejącego kodu
 * - nie możesz użyć słowa kluczowego `return`
 * - możesz modyfikować parametry funkcji
 * - możesz dopisywać nowy kod
 */

function getTheRefund(refundFn) {
	const totalRefund = 300;
	fireCount(getTheRefund)
	refundFn(totalRefund);
}

// Person 1
let collectedRefund = 0;


// Person 2
let collectedTwoRefunds = 0;


// #Reguła:
// Nie możesz zmieniać kodu poniżej:
assertThat(
	'should have 300 on collectedRefund',
	expect => expect(collectedRefund).toBe(300)
)  //=

assertThat(
	'should have 600 on collectedTwoRefunds',
	expect => expect(collectedTwoRefunds).toBe(600)
)  //=

assertThat(
	'function getTheRefund should fire 3 times',
	expect => expect(getTheRefund.fired).toBe(3)
)  //=
