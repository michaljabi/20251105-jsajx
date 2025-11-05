/**
 * d20-collection-api
 * Explain
 *
 * #Cel:
 * Poznanie Najbardziej powszechnych i użytecznych konstrukcji z Collection API: Map i Set.
 * Mapa: posiada składnie 'klucz' => 'wartość' gdzie klucze są unikatowe (jeśli powtórzymy klucz, nadpiszemy wartość)
 * Set: posiada unikatowe wartości, jeśli będziemy próbować wrzucić istniejące już wartości - nie zostaną one zapisane.
 */

// W klasycznym JS (przed 2015) - standardową kolekcją danych jest oczywiście Array.
// Programiści korzystając z własności Object - jako "hashmap" - dynamicznego dostawania się do pól obiektu
// Imitują - Mapę.
// Dodatkowo zależność nie pozwalająca w Obiekcie - na istnienie dwóch tych samych nazw pól, sprawia,
// że przynajmniej dla typów prostych - jesteśmy w stanie łatwo imitować Set

// Long log time ago... before golden ages od JS:

// MAPA:
const myMap = {};

console.log(myMap['key']);

myMap['key'] = 'value';
console.log(myMap['key']);

myMap['key'] = 'overwrite value';
console.log(myMap['key']);

delete myMap['key'];
console.log(myMap['key']);

// nie posiadamy tutaj żadnych metod pomocniczych (Trzeba by je było sobie zrobić samemu, jak np. `.has`, `.remove` etc.)

// SET:
const mySet = {};

mySet[0] = true;
mySet[10] = true;
mySet[10] = true;
mySet[200] = true;
console.log(Object.keys(mySet));

delete mySet[0];
console.log(Object.keys(mySet));

// znów: brak metod pomocniczych, musimy również uważać na zmianę typu danych (number ==> string) etc.



// Dopiero po 2015 roku do języka dodane są natywne: Map oraz Set.
// Wymagają one polyfill'owania - ponieważ to konstrukcje z pełnymi zestawami funkcjonalności
// tl;dr - to całe API - więc sam transpiler nie wystarczy.

const myRealMap = new Map();

myRealMap.set( 'hello', 'World' );
myRealMap.set( 'hello', 'World 2' );
myRealMap.set( 'myName', 'Maurice Moss' );
myRealMap.set( 'myOtherName', 'Roy' );

console.log( myRealMap );
console.log( myRealMap.get( 'non-existing' ) );
console.log( myRealMap.get( 'hello' ) );

// Usuwanie elementu:
myRealMap.delete('hello') //=
console.log(myRealMap)

// Tworzenie nowej Mapy z istniejącej tablicy (dwuwymiarowej)
console.log(
	new Map([['key', 'value'], ['key2', 800]])
)
// Przekształcenie Map na Array:
// Z pomocą przychodzi statyczna metoda: `Array.from`
console.log(Array.from(myRealMap))
// Array kluczy:
console.log(Array.from(myRealMap.keys()))
// Array wartości:
console.log(Array.from(myRealMap.values()))

// Iterowanie:
for(const key of myRealMap.keys()) {
	console.log(key)
}
for(const value of myRealMap.values()) {
	console.log(value)
}
for(const entry of myRealMap) {
	console.log(entry)
}

// Trick:
const theItGuy = Object.fromEntries(myRealMap);
console.log(theItGuy)
console.log(theItGuy.myName)

// Sprawdzenie czy dany klucz istnieje w Mapie:
myRealMap.has('myName') //=

// Wrzucenie nowej wartości do mapy:
myRealMap.set('name', 'James') //=

// Ilość elementów w mapie:
myRealMap.size //=

const myRealSet = new Set();

myRealSet.add( 'apple' );
myRealSet.add( 'cherry' );
myRealSet.add( 'banana' );
myRealSet.add( 'banana' );
myRealSet.add( 'banana' );
myRealSet.add( 'cherry' );
myRealSet.add( 'mango' );

console.log( myRealSet );

myRealSet.delete('mango') //=

console.log( myRealSet );

// Tworzenie nowego Set'a z istniejącej tablicy
console.log(
	new Set([1, 2, 3, 4, 4, 5, 6, 6, 1, 1, 2, 3, 4, 5, 6, 7, 8, 8, 8])
)
// Przekształcenie Map na Array:
// Z pomocą przychodzi statyczna metoda: `Array.from`
console.log(Array.from(myRealSet))

// Iterowanie:
for(const fruit of myRealSet) {
	console.log(fruit)
}

// Sprawdzenie czy dana wartość istnieje w Secie:
myRealSet.has('apple') //=
myRealSet.has('strawberry') //=

// Wrzucenie nowej wartości do seta:
myRealSet.add('strawberry') //=

// Ilość elementów w secie:
myRealSet.size //=
