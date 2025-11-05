import { assertThat } from '../../j4b1-assert.js'
/**
 * d30-weak-collections
 * Challenge
 *
 * Firmowa stołówka wydaje posiłki za okazaniem specjalnego kuponu.
 * Niestety, nie posiada kontroli nad tym kto ile odebrał posiłków
 *
 * Sprytny Roy, zgarniając kilka dodatkowych kuponów od koleżanek z 7 piętra,
 * ustawia się w kolejce kilka razy (przechodząc na koniec kolejki)
 * odbiera w ten sposób lunch po kilka razy.
 *
 * Biorąc pod uwagę fakt iż nie możemy zmienić klasy Person,
 * oraz dodać do instancji dodatkowych "pól" - innymi słowy: osoby są nietykalne
 * nie możemy również zmienić sposobu wydawania posiłków,
 * możemy jedynie dodać dodatkowe metody weryfikacji.
 *
 * Zaproponuj bezkosztowe z punktu widzenia pamięci - rozwiązanie problemu
 *
 * * Reguły:
 * - Nie możesz usuwać istniejącego kodu
 * - Nie możesz dodawać pól i metod do klasy, oraz modyfikować instancji
 */

class Person {
	mealsCollected = 0;

	collectMeal() {
		this.mealsCollected++;
	}
}
const moss = new Person();
const roy = new Person();
let canteenQueue = [roy, new Person(), roy, moss, new Person(), roy, new Person(), roy];
;(function serveMeals() {
	// #Reguła:
	// Kodzik można pisać tylko w tym bloku.
	// Możesz tylko dopisywać
	canteenQueue.forEach(person => {
		person.collectMeal();
	})
})();
canteenQueue = [];

// #Reguła:
// Nie możesz zmieniać kodu poniżej:
assertThat(
	'Moss should collect just one meal',
	expect => expect(moss.mealsCollected).toBe(1)
)  //=

assertThat(
	'Roy should collect just one meal',
	expect => expect(roy.mealsCollected).toBe(1)
)  //=
