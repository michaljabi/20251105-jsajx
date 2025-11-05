import { assertThat } from '../../j4b1-assert.js'
/**
 * c10-immutability
 * Warm up
 *
 * Zaimplementuj funkcje push oraz pop dla tablic - na nowo!
 * Powinny one za każdym razem tworzyć nowe tablice - nie mutując istniejących!
 *
 * * Reguły:
 * - Pisz kod tylko wewnątrz `push` i `pop`
 */

// 1) PUSH FUNCTIONALITY:

function push (element, array) {
	// #Reguła:
	// Kodzik można pisać w tym bloku.
	return array;
}

const original = [1, 2, 3, 4, 5];
const result = push(900, original);

// #Reguła:
// Nie możesz zmieniać kodu asercji poniżej:
assertThat(
	'Should not mutate original data (original and result should point to different place in memory)',
	expect => expect(result).notToBe(original)
)  //=

assertThat(
	'Original data stays intact',
	expect => expect(original.toString()).toBe('1,2,3,4,5')
)  //=

assertThat(
	'New data should be with number 900',
	expect => expect(result.toString()).toBe('1,2,3,4,5,900')
)  //=


// ---------------------------------------------------------------------------------------------------------------------
// 2) POP FUNCTIONALITY:

function pop(array) {
	// #Reguła:
	// Kodzik można pisać w tym bloku.
	return array;
}

const withAllElements = ['mangoes', 'strawberries', 'blueberries'];
const poppedElements = pop(withAllElements);

assertThat(
	'Should not mutate original data',
	expect => expect(poppedElements).notToBe(withAllElements)
)  //=

assertThat(
	'Original data stays intact',
	expect => expect(withAllElements.toString()).toBe('mangoes,strawberries,blueberries')
)  //=

assertThat(
	'New data should be without blueberries fruit',
	expect => expect(poppedElements.toString()).toBe('mangoes,strawberries')
)  //=



