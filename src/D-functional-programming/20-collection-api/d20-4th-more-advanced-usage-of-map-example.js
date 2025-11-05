import { assertThat } from '../../j4b1-assert.js'
/**
 *
 *  Używając Map() możemy na przykład utworzyć tzw. In Memory DB.
 *  Czyli bazę danych w pamięci komputera.
 *
 *  Gdzie kluczami będą stringi - nazwy tabelek,
 *  a samymi "tabelkami" w bazie, nowe instancje Array
 *
 */

function myLittleInMemoryDB() {
	// Nasza nowa mapa:
	const myLittleDb = new Map();
	return {
		// Dodaj element jako klucz i wartość
		insertItem(tableName, item) {
			if(!myLittleDb.has(tableName)) {
				// Jeśli klucz w mapie nie istnieje to tworzymy nowy razem z pustą tablicą (Array)
				myLittleDb.set(tableName, []);
			}
			// Teraz klucz NA PEWNO istnieje
			// a skoro jego wartość to Array, możemy dodać nowy "item" w ten sposób do tablicy:
			myLittleDb.get(tableName).push(item);
		},
		getAll(tableName) {
			// Zwracamy tablice, albo null jeśli dany klucz nie istnieje
			return myLittleDb.get(tableName) || null;
		},
		getItemById(tableName, itemId) {
			// Żeby wyciągnąć rzecz po id, trzeba odwołać się do konkretnego klucza (to jest
			const items = myLittleDb.get(tableName);
			const [element = null] = items.filter((e) => e.id === itemId);
			return element;
		},
		getItem(tableName, queryFn) {
			const items = myLittleDb.get(tableName);
			return items.filter(queryFn);
		},
		getTheMap() {
			return myLittleDb;
		}
	}
}

const dbInstance = myLittleInMemoryDB();

dbInstance.insertItem('coffee', {id:1, name: 'Mocha'})
dbInstance.insertItem('coffee', {id:2, name: 'Espresso'})

dbInstance.insertItem('barista', {id:1, name: 'Maurice', lastName: 'Moss'})
dbInstance.insertItem('barista', {id:2, name: 'Jen', lastName: 'Barber'})
dbInstance.insertItem('barista', {id:3, name: 'Jen', lastName: 'Doe'})

// Jak wygląda nasza baza danych:
console.log(dbInstance.getTheMap());

assertThat(
	'Should have 2 coffees inserted',
	expect => expect(dbInstance.getAll('coffee').length).toBe(2)
)  //=
assertThat(
	'1st coffee should be Mocha',
	expect => expect(dbInstance.getAll('coffee')[0].name).toBe('Mocha')
)  //=

assertThat(
	'Id=1 barista should be Maurice Moss',
	expect => expect(dbInstance.getItemById('barista', 1).lastName).toBe('Moss')
)  //=
assertThat(
	'We should be able to query DB e.g. all barista named "Jen"',
	expect => expect(dbInstance.getItem('barista', b => b.name === 'Jen').length).toBe(2)
)  //=

assertThat(
	'should return null for not existing entry',
	expect => expect(dbInstance.getItemById('barista', 100)).toBe(null)
)  //=
assertThat(
	'should return null for not existing table',
	expect => expect(dbInstance.getAll('some-table')).toBe(null)
)  //=
