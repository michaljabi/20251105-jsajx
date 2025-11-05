/**
 * b20-what-is-this
 * Explain
 *
 * #Cel:
 * Poznanie własności słowa kluczowego `this` w JS i genezy jego "Dziwnego zachowania" oraz "Niebezpieczeństwa"
 * związanego z jego stosowaniem.
 * Poznanie metod ucieczki przed tymi niebezpieczeństwami wykorzystując `.bind` lub arrow functions
 */


// This zależy od kontekstu !
// Co to w praktyce oznacza ?
// Że nie możemy być do końca pewni co siedzi pod słowem kluczowym `this` póki nie wiemy - kto i w jakich okolicznościach wywołuje metodę.

// Spójrzmy na przykład z warm-up nieco inaczej:
function sayYourName() {
	return this.fullName;
}

const personRoy = {
	fullName: 'Roy Trenneman',
	profession: 'The IT Guy',
	sayYourName
}

const personJen = {
	fullName: 'Jen Barber',
	profession: 'IT Manager',
	sayYourName
}

// Funkcja zostaje po prostu wywołana - wtedy słowo kluczowe this pokazuje na obiekt globalny
sayYourName(); //=

// Teraz wywołujemy metodę na obiekcie, this pokazuje na instancje tego obiektu:
personJen.sayYourName(); //=

// Tutaj jest bardzo podobnie:
personRoy.sayYourName(); //=


// Podobnie będzie się działo jeśli pożyczymy metodę od obiektu:

const personMaurice = {
	name: 'Maurice',
	getName() {
		return this.name;
	}
}

personMaurice.getName(); //=

const borrowName = personMaurice.getName;

borrowName(); //=
// Zaraz... zaraz... jak to "nodejs" ??!

// Ponieważ teraz pod `this` siedzi obiekt globalny.
// Zobacz:
console.log(global.name);

// Deklarując stałą borrowName - zrobiliśmy sobie referencję do metody, jednak wywołujemy ją teraz poza obiektem.
// Sprawia to pewien problem. Ponieważ kontekst wywołania zmienia się.
// Jeśli metoda z `this` jest wywołana poza obiektem - dostaje kontekst globalny.
// Może również dostać kontekst innego obiektu - jeśli to na nim zostanie wywołana, przykład:

const myCar = {
	name: 'Audi',
	whatIsYourName: borrowName
}

myCar.whatIsYourName(); //=

// Czasami takie zachowanie:
borrowName() //=

// Może nie być do końca tym czego byśmy się spodziewali,
// Dlatego możemy na siłę "przyspawać" kontekst do danej metody. Służy do tego statyczna metoda ma obiekcie funkcji nazwana: .bind()

// Zobacz:
const bindBorrowName = borrowName.bind(myCar);

borrowName(); //=
bindBorrowName() //=
bindBorrowName() //=

const otherCar = {
	name: 'BMW',
	bindBorrowName
}
// Nawet teraz kontekst się nie zmieni [!]
// wykonaliśmy wcześniej .bind() i to jest wiążące
otherCar.bindBorrowName() //=



// Wraz z wejściem w 2015r. tzw. arrow functions - poza skróconym zapisem, mają one jeszcze jedną funkcjonalność:
// Nie zmieniają kontekstu wywołania.
// Jeśli nie zostaną zadeklarowane na obiekcie - słowo kluczowe `this` nie pokaże na obiekt globalny,
// tylko na pusty obiekt.

const myThisInsideAnArrow = () => {
	return this;
}

myThisInsideAnArrow() //=

const adminUser = {
	role: 'SuperAdmin',
	getRole: () => this.role
}

adminUser.getRole(); //=

// ?? DLACZEGO ?
// Pamiętaj: liczy się miejsce zadeklarowania
// w momencie deklarowania adminUser'a jesteśmy w obiekcie globalnym - a ponieważ używamy arrow functions - dostajemy pusty obiekt pod `this`.

// Żeby uzyskać taką funkcjonalność, musimy zejść poziom niżej, przykładowo:

const otherUser = {
	role: 'NormalUser',
	getRole() {
		// zauważ że getRole to teraz standardowa metoda, wiec tutaj `this` będzie ZALEŻNE OD KONTEKSTU
		const showYourRole = () => this.role;
		return showYourRole();
	}
}

console.log(otherUser.getRole());

// Porównaj to z następującą sytuacją:

const otherUserWithFunction = {
	role: 'NormalUser',
	getRole() {
		// zauważ że getRole to teraz standardowa metoda, wiec tutaj `this` będzie ZALEŻNE OD KONTEKSTU
		// console.log(this)
		function showYourRole() {
			// słowo `this` showYourRole, również jest zależne od kontekstu wywołania,
			// ponieważ showYourRole, to nie metoda na obiekcie, a funkcja lokalna, zgadnij co tak na prawdę siedzi pod `this`
			// console.log(this.name)
			this.role;
		}
		return showYourRole();
	}
}

console.log(otherUserWithFunction.getRole());


// Wniosek:
// Arrow function doskonale nadaje się do callbacków i jako zapis lokalnych funkcji pomocniczych.
// dzięki czemu "nie gubimy" kontekstu. Musimy jednak zwrócić uwagę - co będzie mogło siedzieć pod słowem kluczowym `this`
// w momencie, w którym deklarujemy arrow function !
