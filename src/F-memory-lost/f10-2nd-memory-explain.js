// "use strict";
/**
 * f10-2nd-memory-explain
 * Explain
 *
 * #Cel:
 * Podsumowanie wszystkich zależności związanych z alokacją pamięci i sposobem jej działania w JS
 */

// Język wysokopoziomowy - taki jak np. JavaScript - automatyzuje proces zarządzania pamięcią.
// Dzieje się tak za sprawą pewnych mechanizmów:

// 1. Automatycznego przydzielania pamięci - której potrzebujesz
// .....
		// 2. działanie programu, używanie pamięci, zapis, odczyt etc.
// ......
// 3. Uwolnienia niepotrzebnej pamięci za pomocą Garbage Collector'a

// Tutaj mamy przykłady jak alokowana jest pamięć dla poszczególnych typów danych w JS:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management#Allocation_in_JavaScript


// Wiemy że pamięć w JS jest alokowana dynamicznie, nawet w przypadku tablic - nie musimy deklarować
// ich wielkości, ilość zawartych w niej elementów - może zmieniać się w czasie.

// zobaczmy sobie referencje w JS, aby wyjaśnić sobie w dalszej kolejności jak działa Garbage Collector:

// 1. Deklarujemy zmienną i przypisujemy jej nowy obiekt:
let person = { name: 'Jen' };

// To co tutaj się dzieje, to:
// a) W pamięci zostało przydzielone miejsce dla { name: 'Jen' }
// b) referencja `person` prowadzi nas do obiektu { name: 'Jen' }

// 2. Dopisujemy nową referencje do obiektu:
let personLinker = person;

// To co się stało:
// a) `person` prowadzi nas do miejsca w pamięci z obiektem: { name: 'Jen' }
// b) `personLinker` również prowadzi nas do tego samego obiektu w pamięci: { name: 'Jen' }
console.log(person)
console.log(personLinker)

// Potwierdzenie tej zależności to np. zmiana obiektu - dodanie pola:
personLinker.lastName = 'Barber'

console.log(person)
console.log(personLinker)

// 3.
// Teraz, możemy zmienić obiekt na który wskazuje person:
person = { name: 'Moss' }

// To co się stało:
// a) `person` prowadzi nas do nowo zadeklarowanego miejsca w pamięci z obiektem: { name: 'Moss' }
// b) `personLinker` dalej prowadzi nas do tego samego obiektu w pamięci: { name: 'Jen', lastName: 'Barber' }
console.log(person)
console.log(personLinker)

// 4.
// Zmieniamy miejsce na które pokazuje personLinker:
personLinker = person;

// To co się stało:
// a) `person` dalej prowadzi nas do tego "nowego" obiektu w pamięci: { name: 'Moss' }
// b) `personLinker` prowadzi nas do tego samego miejsca co `person` !
console.log(person)
console.log(personLinker)

// 5.
// Oznacza to że nic nie prowadzi już do miejsca { name: 'Jen', lastName: 'Barber' }
// Obiekt ten w tym układzie, ponieważ nie ma żadnych referencji
// - zostanie oznaczony jako collectible lub "garbage"

// Automatyczny mechanizm - Garbage Collector zabierze z pamięci ten obiekt, ponieważ nie będziemy mieli
// jak z niego skorzystać - jest już niepotrzebny, nic do niego nie prowadzi


// Bardziej rozbudowany przykład, gdzie mamy obiekt w środku obiektu:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management#Reference-counting_garbage_collection


// czym są: MEMORY LEAKS?

// Wyciek pamięci to taki obszar pamięci, który z punktu widzenia naszej aplikacji, nie jest już nam potrzebny
// Jednak nie został zwolniony (oddany do puli wolnej pamięci)

// Jak spowodować taki memory leak w praktyce:

// 1)
// Wyobraź sobie dowolny komponent renderowany na stronie.
function myDummyComponent() {

	let second = 0;
	let fireRerender = () => {};
	setInterval(() => {
		second++;
		fireRerender()
	}, 1000)

	return {
		onRerender(callback) {
			fireRerender = callback
		},
		render() {
			return `
				<h1>Hello World</h1>
				<main>
				   <div> ${second} </div>
				</main>
			`
		}
	}
}

// Odkomentuj kod poniżej aby zobaczyć tę implementację
const myComponent = myDummyComponent();
//
myComponent.onRerender(() => {
	console.log(myComponent.render())
 })

// Jakie posiadamy tutaj problemy?

// Wyobraź sobie że nie potrzebujemy już tego komponentu, na przykład -
// Przechodzimy do innej strony.
// Niestety cała funkcjonalność rerender - będzie wykonywała się cały czas,
// ponieważ nigdzie nie zwalniamy `setInterval`
// Biega on w pamięci cały czas niezależnie czy komponent jest nam potrzebny czy nie.
// Garbage collector - nie ma tutaj nic "do gadania", ponieważ fireRerender dalej ma odniesienie do callbacka,
// który wykonuje się w `setInterval` - a to tylko jeden z powodów!

// Podsumowując:
// Dlatego właśnie frameworki - radzą sobie z tym zagadnieniem stosując dla komponentów tzw.
// lifecycle methods
// To w nich (destroy(), unmount(), etc...) - będziemy umieszczać logikę zwalniającą, timery, iterwały
// cokolwiek co będzie powodowało memory leak, jeśli nie zostanie zwolnione (clearTimeout, clearInteval)


// 2)
// Możemy mieć wskaźnik na elment DOM, zrobiony po przez:
// let $element = document.querySelector('#someID');

// potem element '#someID' może być usunięty z drzewa dom, jednak jeśli my, posiadamy wskaźnik do tego elementu
// ($element) - to w tym układzie Garbage Collector - nie usunie tego obiektu z pamięci
// Natomiast z pkt. widzenia aplikacji - nie ma już go na DOM, nie jest potrzebny...

// 3)
// Wartości globalne
// Jeśli zapiszemy taki kodzik i nie jesteśmy w "use strict";

function hello() {
	python_like = 'Hello World'
}
// hello()
// console.log(global.python_like);

// Zmienna python_like - zostanie wpisana do obiektu globalnego, nie będziemy jej prawdopodobnie nigdy potrzebować,
// albo inaczej - intencja nasza byłaby żeby była to zmienna lokalna i została zgarnięta przez GC jak tylko
// nasza funkcja hello się wykona
// tak się nie stanie python_like - będzie pisane do przestrzeni globalnej (będzie dostępne pod: globalThis.python_like)

// Problemem jest tutaj brak dodania słowa kluczowego `let`, lub `const`
// Jednak przypomnijmy sobie pewną zależność ze słowem kluczowym `this`:

function trickyHello() {
	console.log(this);
	this.greetings = 'Hello Mike !'
}

// co się stanie jeśli uruchomimy tę funkcje "tak po prostu" a nie na konkretnym obiekcie ?
// odkomentuj linię poniżej
// trickyHello();

// zobacz efekt:
// console.log(globalThis.greetings)

// Dlatego trzeba mieć tę świadomość - ponieważ funkcja trickyHello jest poprawna dla JS.
// Problemem będzie kontekst wywołania !
// Trzeba tego pilnować.

// Na szczęście tym układzie dodanie na początku tego skryptu: "use strict"; - załatwia sprawę,
// dla obu przypadków !
