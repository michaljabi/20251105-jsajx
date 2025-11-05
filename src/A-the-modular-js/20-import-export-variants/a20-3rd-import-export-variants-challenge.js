import { assertThat } from '../../j4b1-assert.js'

/**
 * a20-import-export-variants
 * Challenge
 *
 * Czesiek jest pragmatycznym programistą.
 * Zgodnie z dobrymi praktykami i poetyckim rzemiosłem programisty, przygotowuje sobie całą masę tzw. helper-functions.
 * Spełniają one wszystkie dobre wymagania, są "pure", SOLID i w ogóle - cool.
 * Jednak do jego kodu wkradł się bałagan - funkcji pomocniczych (util'ów) jest cała masa, część z nich nie da się
 * ponownie użyć - bo brakuje dostępu. Dodatkowo są porozmieszczane w różnych miejscach i troszczą się o różne rzeczy.
 * Przykładowo: jedne pomagają tylko String'om a inne Number'om
 *
 * Czas zaprowadzić tutaj porządek !!!
 *
 * Projekt znajduje się w folderze: a20-challenge-project
 * Twoim zadaniem jest odnalezienie i zebranie wszystkich helper-functions w jedno miejsce:
 * czesuaf-util.js
 *
 * * Reguły:
 * - Nie możesz używać kopi-pejsta, funkcje oryginalnie zostają na swoich miejscach (w swoich plikach)
 * - [!] Importy do tego pliku mogą pochodzić tylko z `./a20-challenge-project/czesuaf-util.js`
 * - Funkcje muszą być podzielone na konkretne kategorie - szczegóły w przypadkach testowych poniżej
 * - W innych plikach projektowych używasz głównie słów kluczowych: import / export
 * - W tym pliku (challenge) możesz tylko używać składni z import !
 */

// #Reguła:
// Nie możesz zmieniać kodu poniżej:
const sampleString = 'Hello World';

assertThat(
	'lastLetter should give the last letter of the string',
	expect => expect(stringHelper.lastLetter(sampleString)).toBe('d')
)  //=
assertThat(
	'numberOfChars should give length of the given string',
	expect => expect(stringHelper.numberOfChars(sampleString)).toBe(sampleString.length)
)  //=
assertThat(
	'numberOfChars should give length of the given string',
	expect => expect(stringHelper.countWords('Hello World ! ?')).toBe(2)
)  //=
assertThat(
	'numberOfChars should give length of the given string',
	expect => expect(stringHelper.capitalize('janusz')).toBe('Janusz')
)  //=


assertThat(
	'addNumbers',
	expect => expect(numberHelper.addNumbers(1000, 210, 20, 0)).toBe(1230)
)  //=

assertThat(
	'averageFrom',
	expect => expect(numberHelper.averageFrom(30, 40, 100, 20)).toBe(47.5)
)  //=

assertThat(
	'toSecondPower',
	expect => expect(numberHelper.toSecondPower(12)).toBe(144)
)  //=
