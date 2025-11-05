import { assertThat } from '../../j4b1-assert.js'

/**
 * b40-cloning
 * Explain
 *
 * #Cel:
 * Objaśnienie sposobu klonowania struktur danych i problemów z tym związanych w JavaScript.
 */

// Klonowanie w JS przydaje się w momencie, w którym posiadamy instancję danego obiektu
// i chcemy mieć jej niezależną kopię

// Bardzo często jest to potrzebne w przypadku przechowywania i aktualizacji stanu,
// Zwłaszcza tam gdzie nie chcemy mutować danych.

// Rozważ przykład:
const reference = {};
const myNewObject = reference;

reference.name = 'Mike';
myNewObject.lastName = 'Kowalsky';

console.log(reference === myNewObject);
console.log(reference);
console.log(myNewObject);

// ten układ nie powinien dziwić.
// Jedynie typy proste "primitives" - tj. String, Number, Boolean, BigInt, Symbol - będą przypisywane przez wartość
// Wszystkie pozostałe typy dziedziczą w JS po Object
console.log(typeof {})
console.log(typeof [])
console.log(typeof new Date())
console.log(typeof new RegExp(''))

// Typy złożone rezerwują miejsce w pamięci, w tym układzie, przypisanie do nowej zmiennej / stałej
// istniejącego już w pamięci obiektu
// Powoduje powstanie "wskaźnika" na ten obiekt.

// Dlatego porównanie 2 referencji - wskazujących na to samo miejsce w pamięci daje nam wynik `true`
console.log(reference === myNewObject);


// Dobrze obrazuje to (odniesienie przez referencje) następujący przykład.
let myHelloObject = {hello: 'World'}
const otherReference = myHelloObject;

myHelloObject = {};

console.log(myHelloObject);
console.log(otherReference);

// Zapis: {hello: 'World'} rezerwuje w pamięci miejsce dla nowego obiektu.
// myHelloObject - pokazuje na ten obiekt (referencja do obiektu)
// później deklarujemy `otherReference` które wskazywać ma na to samo miejsce co myHelloObject
// zapis: const otherReference = myHelloObject;

// następnie, zapis:
// myHelloObject = {};
// nie powoduje wcale "wyczyszczenia" obiektu !!!
// Sprawia jedynie, że zmienna `myHelloObject` pokazuje na nowe miejsce w pamięci: {} (pusty obiekt).

// Teraz nasza stała `otherReference` jest jedynym połączeniem z miejscem: {hello: 'World'};


// Wracając do klonowania....

// Widzieliśmy na samej górze, że sam zapis:
// const myNewObject = reference;
// nie powoduje utworzenia nowego obiektu...
// ani tym bardziej skopiowania jego zawartości w nowe miejsce.

// Shallow COPY - to the rescue !
// Mogło by się wydawać że następujące, nowoczesne zabawki, załatwią sprawę:

const user = {name: 'Mike'};

const newUser = {...user};
// lub:
const assignedUser = Object.assign({}, user);

console.log(user)
console.log(newUser)
console.log(assignedUser)
console.log(user === newUser);
console.log(user === assignedUser);
console.log(assignedUser === newUser);

// W istocie jest to dobre rozwiązanie, dopóki nie dotrzemy do zagnieżdżenia obiektu w obiekcie.
const myHouse = { name: 'Small loft', address: { street: 'Grodzka', number: 8} };
const myCopyHouse = { ...myHouse };

console.log(myHouse);
console.log(myCopyHouse);
myCopyHouse.name = 'Changed house name !'
console.log(myHouse);
console.log(myCopyHouse);

// Show time:
myCopyHouse.address.street = 'Mickiewicza';

console.log(myHouse);
console.log(myCopyHouse);
console.log(myCopyHouse.address === myHouse.address);

// Dlatego właśnie użycie spread operatora {...} lub metody Object.assign({}, o);
// Nazywane jest: Shallow Copy - Płytka kopia.

// Możemy klonować w ten sposób jedynie obiekt nie posiadający w sobie typów złożonych (tablica, obiekty...)
// Jeśli jednak wystąpią tego typu zależności - potrzebujemy czegoś więcej.
// Potrzebujemy Deep Copy....

// >------
// DEEP COPY - CLONING:
// --------------------------------
// Nie jest to jednak takie proste jak w warm-up. Trzeba rozważyć kilka różnych scenariuszy:

class Car {
	name = 'Audi A6'
}

const complicatedObject = {
	myDate: new Date(),
	myString: 'some string',
	myFunction() {
		console.log('Hello World')
	},
	myNumber: NaN,
	myArrayOfObjects: [{ name: 'John !'}],
	myRegExp: /./,
	myNullValue: null,
	myOtherNumber: 10292,
	address : {
		hello: 'MOMOT'
	} ,
	car: new Car()
}

function professionalCloner(toClone) {
	switch(typeof toClone) {
		case 'string':
		case 'symbol':
		case 'undefined':
		case 'boolean':
		case 'number':
		case 'bigint':
			return toClone;
		case 'function':
			return function(...args) {
				return toClone.apply(this, args)
			};
	}

	// potrzebny osobny zapis dla null (bo `typeof null` to - `object`!)
	if(toClone === null) {
		return toClone;
	}
	if(toClone instanceof Date) {
		return new Date(toClone);
	}
	if(toClone instanceof RegExp) {
		return new RegExp(toClone);
	}
	if(Array.isArray(toClone)) {
		return toClone.map(e => professionalCloner(e));
	}
	// Jeśli żaden `if` nie odpali
	// oznacza to że mamy do czynienia z innego rodzaju - obiektem.
	// Warto go przekopiować początkowo jako `shallow`, jednak używając metody `Object.create`
	// Zachowamy wtedy konstruktor dla nowego obiektu
	// później klonujemy każdy z kluczy dla obiektu i nadpisujemy go - korzystamy z rekurencji.
	const newObject = Object.create(toClone);
	for(const key of Object.keys(toClone)) {
		newObject[key] = professionalCloner(toClone[key]);
	}
	return newObject
}

const clonedComplicated = professionalCloner(complicatedObject);

assertThat(
	'has same structure but not being the same instance in memory!',
	expect => expect(clonedComplicated).notToBe(complicatedObject)
)  //=
assertThat(
	'clone suppose to be deep !',
	expect => expect(clonedComplicated.address).notToBe(complicatedObject.address)
)  //=
assertThat(
	'should clone the array',
	expect => expect(clonedComplicated.myArrayOfObjects).notToBe(complicatedObject.myArrayOfObjects)
)  //=
assertThat(
	'should clone even objects inside an array',
	expect => expect(complicatedObject.myArrayOfObjects[0]).notToBe(clonedComplicated.myArrayOfObjects[0])
)  //=
assertThat(
	'should clone the NaN for numeric value',
	expect => expect(complicatedObject.myNumber).notToBe(clonedComplicated.myNumber)
)  //=
assertThat(
	'Car object should be cloned',
	expect => expect(complicatedObject.car).notToBe(clonedComplicated.car)
)  //=
assertThat(
	'Copied Car object should preserve its constructor',
	expect => expect(complicatedObject.car.constructor.name).toBe(clonedComplicated.car.constructor.name)
)  //=
assertThat(
	'cloned functions should not lead to the same point in memory',
	expect => expect(complicatedObject.myFunction).notToBe(clonedComplicated.myFunction)
)  //=
assertThat(
	'serialized object structure should be the same',
	expect => expect(JSON.stringify(complicatedObject)).toBe(JSON.stringify(clonedComplicated))
)  //=
