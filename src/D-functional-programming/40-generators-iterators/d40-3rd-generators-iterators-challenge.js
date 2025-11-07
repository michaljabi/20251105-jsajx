import { assertThat } from '../../j4b1-assert.js'
/**
 * d40-generators-iterators
 * Challenge
 *
 * * Reguły:
 * - Swój kod pisz w klasie GuestList
 * - W odpowiednim momencie implementacji odkomentuj blok z pętlą for
 */

class GuestList {

	// pole prywatne (dostępne TYLKO w klasie, nie widoczne na instancji).
	#myGuests = [];

	signGuest(name, lastName) {
		this.#myGuests.push({name, lastName })
	}

	get guests() {
		// robimy shallow copy SPECJALNIE, żeby nie udostępniać referencji do tablicy na zewnątrz
		return [...this.#myGuests];
	}

	removeGuest(idx) {
		// metoda mutująca tablice z danymi.
		this.#myGuests.splice(idx, 1);
	}

	// Jeśli wrzucisz instancję GuestList do pętli for, to wtedy zobaczysz imiona.
	*[Symbol.iterator]() {
		for(const guest of this.#myGuests) {
			yield guest.name
		}
	}
}

// #Reguła:
// Nie możesz zmieniać kodu poniżej:
const myGuests = new GuestList();

console.log(myGuests)
console.log(myGuests.guests)

// to nie zadziała teraz (i o to nam chodziło)
// ponieważ getter nie daje referencji do tablicy #myGuests [!]
myGuests.guests.push({name: 'Troll'})

// Przepis na sprawdzenie propery, methods i "symbols" na intancji klasy
console.log(Object.getOwnPropertyNames(myGuests));
console.log(Object.getOwnPropertyNames(myGuests.constructor.prototype));
console.log(Object.getOwnPropertyNames(GuestList.prototype));
console.log(Object.getOwnPropertySymbols(GuestList.prototype));

myGuests.signGuest('Jane', 'Doe');
myGuests.signGuest('Joe', 'Doe');
myGuests.signGuest('Jan', 'Doe');
myGuests.signGuest('Janina', 'Doe');


const collector = [];
// odkomentuj poniższy blok, kiedy będzie już implementacja:
for(const guestName of myGuests) {
	collector.push(guestName);
}

// #Reguła:
// Nie możesz zmieniać kodu poniżej:
assertThat(
	'should have 4 guest on myGuests GuestList',
	expect => expect(myGuests.guests.length).toBe(4)
)  //=
assertThat(
	'second guest should be Joe',
	expect => expect(myGuests.guests[1]).toEqual( {name: 'Joe', lastName: 'Doe'})
)  //=
assertThat(
	'collector should have all the names from GuestList',
	expect => expect(collector).toEqual(['Jane','Joe','Jan','Janina'])
)  //=


const planeObject = {
	guests: [],
	signGuest() {},
	*[Symbol.iterator]() { yield 20 },
	0: 'arrayLike',
	[Symbol()]: 'test'
}

console.log(planeObject[0])
//tizzer: Symbol! zachowuje się inaczej niż nam się wydaje.... TODO.
console.log(planeObject[Symbol()])