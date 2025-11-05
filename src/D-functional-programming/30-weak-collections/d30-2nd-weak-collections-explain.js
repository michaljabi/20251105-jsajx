/**
 * d30-weak-collections
 * Explain
 *
 * #Cel:
 * Wyjaśnienie zasady działania WeakMap / WeakSet i ich zależności od GarbageCollector'a
 */

// Zacznijmy od kilku spraw:
	// 1: JavaScript posiada mechanizm tzw. Garbage Collector
	// Jego zachowanie objawia się następująco:

let myItGuy = {name: 'Moss'};
myItGuy = null;

// W tym momencie nie ma żadnej referencji prowadzącej do {name: 'Moss'}
// Taki układ sprawia, że Garbage Collector zbierze (wyrzuci) z pamięci {name: 'Moss'}
// Ponieważ GC stwierdzi, że nie jest to nam potrzebne.
// Tak to działa.

// 2:
// WeakSet - nazwany jest "Weak" ponieważ wrzucenie do niego obiektu
// Nie powoduje powstrzymania Garbage Collector'a przed zebraniem z pamięci tego obiektu.

// Przykład:

let myExample = {hello: 'World'};
const classicSet = new Set([myExample]);
myExample = null;

// W tym układzie Garbage Collector nie usunie z pamięci obiektu {hello: 'World'}
// Ponieważ obiekt ten jest przechowywany w classicSet.
// classicSet - posiada do niego referencję.

// I teraz kontrastuje to z tym zachowaniem:

let myOtherExample = {goodbye: 'World'};
const weakSet = new WeakSet([myOtherExample]);
myOtherExample = null;

// W tym układzie GC - usunie obiekt {goodbye: 'World'} z pamięci.
// Dzieje się tak ponieważ Set jest właśnie "Weak" - na tym polega jego zadanie.
// Możemy do niego wrzucić TYLKO OBIEKTY - nie da się dodać do WeakSet - typu prostego.
// Dodatkowo nie da się po WeakSet iterować !
// Jeśli ostatnia referencja do obiektu zostanie usunięta, to WeakSet nie powstrzyma GC przed zebraniem tego obiektu !

// W tym układzie w WeakSet, posiadamy jedynie metody:
// .add
// .delete
// .has

// W czym może pomóc nam WeakSet?
// WeakSet - to dalej Set, jego wartości pomimo, że muszą być obiektami - to mają pozostać unikatowe.
// We wszystkich operacjach w których nie chcemy np. ponownie przetwarzać tego samego obiektu,
// Możemy mieć kontrolę nad tym, że już został on przez nas dodany i siedzi w secie `.has()`

// PRZYKŁAD DZIAŁANIA
const today = new Date();
const setCollection = new WeakSet([{}, today, today, [], {}, new Date()])

console.log(setCollection.has(today))

// WEAK MAP
//

// WeakMap ma bardzo podobne zasady jak SET jednak to oczywiście mapa.
// Kluczami w WeakMap mogą być TYLKO OBIEKTY - nie można mieć jako klucz typu prostego
// Wartości mogą być dowolne.
// Nie da się iterować po WeakMap'ie.

const myHoldOn = {};
const collection = new WeakMap([[{}, 2], [myHoldOn, 'Hello World!']])

console.log(collection.get(myHoldOn))

// Podobnie jak w Set - WeakMap nie będzie powstrzymywać przed usunięciem obiektów,
// które będą użyte jako klucze w WeakMapie

// Jeśli dany obiekt - klucz WeakMap'y nie będzie posiadał innej referencji
// Zostanie ściągnięty przez GC.
// Co więcej - usunięte zostanie też to co wpisaliśmy jako wartość mapy,

// W tym układzie możemy rozważyć np. kolejną koncepcje prywatności danych w obiekcie JavaScript

function Person(name, age) {
	const privates = new WeakMap();
	privates.set(this, {});
	privates.get(this).somethingPrivate = 'cash';

	this.name = name;
	this.age = age;
	this.insertPrivate = function(name, value) {
		privates.get(this)[name] = value;
	}
	this.readPrivate = function(name) {
		return privates.get(this)[name];
	}
}

let myPerson = new Person('Mike', 40);
myPerson = null;

// w tym układzie za równo instancja myPerson jak i jej zmienne prywatne zostają zebrane
// przez Garbage Collector'a
