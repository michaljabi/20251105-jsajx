import { List } from 'immutable'
import { assertThat } from '../../j4b1-assert.js'
/**
 * c11-non-mutable-with-immutable-js
 * Explain
 *
 *
 * #Cel:
 * Poznanie biblioteki immutable.js - która oferuje właśnie takie "niemutowalne" kolekcje danych.
 * Gdzie modyfikacja danych powoduje utworzenie nowej instancji obiektu.
 */

const original = new List([1, 2, 3, 4, 5]);
const result = original.push(900);

// #Reguła:
// Nie możesz zmieniać kodu poniżej:
assertThat(
	'Should not mutate original data',
	expect => expect(original).notToBe(result)
)  //=

assertThat(
	'Original data stays intact',
	expect => expect(original.toArray().toString()).toBe('1,2,3,4,5')
)  //=

assertThat(
	'New data should be with number 900',
	expect => expect(result.toArray().toString()).toBe('1,2,3,4,5,900')
)  //=


// ---------------------------------------------------------------------------------------------------------------------
// POP FUNCTIONALITY:

const withAllElements = new List(['mangoes', 'strawberries', 'blueberries']);
const poppedElements = withAllElements.pop();

assertThat(
	'Should not mutate original data',
	expect => expect(withAllElements).notToBe(poppedElements)
)  //=

assertThat(
	'Original data stays intact',
	expect => expect(withAllElements.toArray().toString()).toBe('mangoes,strawberries,blueberries')
)  //=

assertThat(
	'New data should be without blueberries fruit',
	expect => expect(poppedElements.toArray().toString()).toBe('mangoes,strawberries')
)  //=

