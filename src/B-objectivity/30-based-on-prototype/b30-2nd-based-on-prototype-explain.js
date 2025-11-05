/**
 * b30-based-on-prototype
 * Explain
 *
 * #Cel:
 * pokazanie i objaśnianie działania prototypów w JS
 */

// Na tym etapie, wiemy że:
// Każda klasa (czyli w JS - funkcja) może posiadać swoje pola statyczne, przykładowo:
function MyDepartment(placement) {
	this.placement = placement;
	this.showYourself = function () {
		// Tutaj `this` będzie wskazywało na instancje obiektu MyDepartment
		return this;
	}
}
MyDepartment.showStatic = function() {
	// Metoda statyczna nie ma dostępu do instancji !!
	// Można tutaj użyć `this`, jednak jest to to samo co użycie:
	// return MyDepartment;
	// tak więc to `this` - to tak naprawdę wskazanie funkcji - konstruktora MyDepartment!
	return this;
}
MyDepartment.otherStaticField = 'hello';

const it = new MyDepartment('Last Floor IT');

console.log(it.showYourself())
console.log(it.showStatic)
console.log(MyDepartment.showStatic())
console.log(MyDepartment.otherStaticField)

// To samo można zapisać w bardziej nowoczesny sposób:
class Department {
	constructor (placement) {
		this.placement = placement
	}
	showYourself() {
		return this;
	}
	static showStatic() {
		return this;
	}
}
Department.otherStaticField = 'hello';

const newIt = new Department('Last Floor IT');

console.log(newIt.showYourself())
console.log(newIt.showStatic)
console.log(Department.showStatic())
console.log(Department.otherStaticField)


// Znamy również inne statyczne własności które dotyczą funkcji - dlatego kod powyżej nie powinien nas dziwić...
// Można na przykład użyć przy konstruowaniu obiektów coś takiego:
const otherIT = new Department('Top floor');
console.log(otherIT.showYourself())
const hijacker = {secret: 'room'}
// Zauważ że metoda `showYourself` posiada w sobie inną statyczną metodę `.bind()` - którą już poznaliśmy
const boundShow = otherIT.showYourself.bind(hijacker);
console.log(boundShow)
console.log(boundShow())


// W takim układzie, w meta-programowaniu JavaScript istnieje jeszcze kilka pól statycznych
// jednym z nich w przypadku konstruktorów tworzonych z funkcji - jest pole:
// `.prototype`

// Zobacz jak się zachowuje:
// Załóżmy, że mamy ekspres do kawy:
class CoffeeMachine {
	coffeeBeans = 200;
	groundCollector = 0;
	makeACoffee() {
		this.coffeeBeans -= 20;
		this.groundCollector += 20;
		return 'Coffee Cup'
	}
}


const myMachine = new CoffeeMachine();
myMachine.makeACoffee();
myMachine.makeACoffee();
myMachine.makeACoffee();

console.log(myMachine)
// Nagle "przypomniało nam się" że nie posiadamy metody do czyszczenia fusów z tacki
// Co teraz ?
// Załóżmy że nie możemy dotykać klasy CoffeeMachine w środku.
// Jak sobie z tym poradzić ?

// Dodać metodę do prototypu:
CoffeeMachine.prototype.cleanGroundCollector = function () {
	this.groundCollector = 0;
}

// Teraz możemy ją wywołać na instancji !!!
myMachine.cleanGroundCollector();

// i mamy pusty zbiornik z fusami:
console.log(myMachine)
console.log(myMachine.groundCollector)

// ZARAZ ZARAZ ?! - jakim cudem, przecież instancja CoffeeMachine (myMachine) - już była gotowa
// w momencie, w którym dodaliśmy nową metodę cleanGroundCollector

// co więcej nowe instancje też będą miały do tego dostęp

const myOtherMachine = new CoffeeMachine();
console.log(myOtherMachine)
myOtherMachine.makeACoffee();
myOtherMachine.makeACoffee();
myOtherMachine.makeACoffee();
myOtherMachine.makeACoffee();
console.log(myOtherMachine)
console.log(myOtherMachine.groundCollector)
// Dowód że nie jest to "statyczne":
myMachine.cleanGroundCollector()
console.log(myOtherMachine.groundCollector)
// SPRAWDZAM!:
myOtherMachine.cleanGroundCollector();
console.log(myOtherMachine.groundCollector)
// Działa 😎.

// OK - tylko jak ?
// Każdy konstruktor (wykonany za pomocą funkcji w JS) - posiadać może swój prototyp.
// Jest to statyczna wartość, którą można rozszerzać tak jak obiekt.
// Co istotne - nie można jej nadpisać, czyli zrobić tak:

// SomeConstructor.prototype = {};
// Wtedy JS "zgubi" wskaźnik na prototyp.
// Jednak jak to się dzieje że instancje "wiedzą o prototypie".
// Także w momencie gdy już jest "po czasie" gdy instancja już została utworzona,
// a my dopiero wtedy rozszerzamy prototyp ?!

// Dzieje sie tak - ponieważ jest to mechanizm działania JavaScript.
// W momencie gdy tworzymy instancję obiektu w pamięci, dostaje on się tam
// ze wszystkimi polami i metodami, które zdefiniowane są w klasie.

// Jeśli jednak wywołamy na instancji metodę która fizycznie nie została wpisana do definicji klasy,
// NIE POWODUJE TO NATYCHMIASTOWEGO BłĘDU !

// Zamiast tego JS idzie do prototypu tej klasy (który mieszka w jednym miejscu w pamięci)
// Na co wskazuje jego zapis - jako pole statyczne.
// Jeśli metoda istnieje w prototypie, to pod słowem kluczowym `this` - pojawi się
// instancja obiektu, na której chcemy tę metodę wywołać !

// Co jednak jeśli metoda nie istnieje ?
// Wtedy dalej nie ma błędu jeśli dana klasa dziedziczy po innej.
// Wtedy to jej metody są przeszukiwane, a jeśli nie ma ich w tej klasie ?
// To JS sprawdza prototyp klasy po której wykonane jest dziedziczenie

// W ten o to sposób tworzy nam się "prototype chain" - łańcuch prototypów,
// po którym będzie sprawdzane czy dana metoda istnieje a jeśli tak -
// zostanie wywołana niejako na "instancji" z której ją wywołaliśmy.

// Niesamowita wydajność prototypów polega na tym - że metody, które chcemy wywołać,
// nie są tworzone w pamięci razem z instancją obiektu. Siedzą w jednym miejscu
// w pamięci.
// Z tego faktu korzystają między innymi transpilery, zmieniające nasz lukier składniowy,
// z `class` na zapis funkcji z konstruktorami - przenosząc metody do prototypów.
