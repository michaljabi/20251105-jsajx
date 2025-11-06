import { assertThat } from '../../j4b1-assert.js'
/**
 * d20-collection-api
 * Warm up
 *
 *
 * * Reguły:
 * - Nie możesz usuwać istniejącego kodu
 * - Możesz dopisywać kod po prawej stronie przyrównania do `distinctNumbers`
 * - Nie możesz zmieniać wartości w `numbers`
 */

const numbers = [10, 20, 30, 2, 2, 2, 30, 20, 2, 10, 8, 9, 0];
// rozwiązanie to tablica: [10,20,30,2,8,9,0];

// rozwiązanie nr3: one liner, albo Array.from albo [...[]]
// const distinctNumbers = Array.from(new Set(numbers));
const distinctNumbers = [...new Set(numbers)];
console.log(distinctNumbers)

// rozwiązanie nr2:
// const distinctNumbers = numbers.filter(distinct());

// rozwiązanie nr1 imperatywne (w kontraście do deklaratywnego)
/*
const cache = [];
for(const no of numbers) {
	if(!cache.includes(no)) {
		cache.push(no);
		distinctNumbers.push(no)
	}
}
*/

// rozwiązanie deklaratywne -> programowanie funkcyjne:
function distinct() {
	const cache = [];
	return (no) => {
		if(!cache.includes(no)) {
			cache.push(no);
			return true;
		}
		return false;
	}
}

// #Reguła:
// Nie możesz zmieniać kodu poniżej:
assertThat(
	'distinctNumbers list should not have number repetitions',
	expect => expect(distinctNumbers.toString()).toBe('10,20,30,2,8,9,0')
)  //=
