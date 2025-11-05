/**
 * g20-using-proxy
 * Explain
 *
 * #Cel:
 * Poznanie funkcjonalności Proxy - opakowania na obiekt bazowy (target),
 * pozwalający na manipulowanie nim i decydowanie o jego dalszym sposobie funkcjonowania.
 */

// Obiekt bazowy:
const person = {
	name: 'Michał'
}

// Można go rozwijać np. o dodatkowe pola dynamicznie:
person.lastName = 'Kowalsky'

console.log(person);

// Póki co bez rewelacji....
// Co jednak gdybyśmy zapakowali go sobie we Wrapper - pozwalający nam totalnie kontrolować co się dzieje z obiektem?

// Przykładowo, za każdym razem gdy poprosisz o pole w obiekcie - ja zwrócę wartość "TROLL" 😁.

const myTroll = new Proxy(person, {
	get ( target, propertyKey ) {
		// console.log(propertyKey)
		// console.log(target[propertyKey])
		return 'TROLL'
	}
})

console.log(myTroll.name)
console.log(myTroll.lastName)
console.log(myTroll.any)
console.log(myTroll.nonExsitent)
console.log(JSON.stringify(myTroll));

// Dzieje się tak ponieważ person zostaje opakowany w obiekt Proxy,
// Obiekt ten posiada 2 parametry:
// - target -> tutaj przekazujemy obiekt który chcemy opakować
// - handler -> to specjalny obiekt, który posiada tzw. TRAPS (pułapki) - są to metody, które pozwalają sterować obiektem

// Dokumentacja:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy#Syntax

// Możliwe do założenia TRAPS:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy#Handler_functions

// Zbadajmy co dzieje się z obiektem powyżej.
// Założona pułapka "get" uruchomi się dla każdej "property" na obiekcie - po która sie zgłaszamy.

// OWSZEM przypomina to zasadę działania jak "getter" - jednak zauważ że getter jest definiowany dla konkretnego pola
// tutaj dostaniem KAŻDE POLE - które chce odczytać developer z obiektu - nawet takie które nie istnieje

// nawet taką, która nie istnieje...
// Pozwala nam zdecydować co mamy zwrócić.
// W `traps` zawsze mamy do dyspozycji `target` - czyli obiekt który oryginalnie został opakowany.
// Możemy więc zwrócić wartość oryginalną, lub zmodyfikowaną.


// Ważne jest to, że samo "założenie" pułapki - bez nawet podawania logiki - powoduje efekt uboczny:
const someOtherSample = {
	hello: 'WORLD',
	say: 'Hello !'
}

const sideEffects = new Proxy(someOtherSample, {
	get ( target, propertyKey ) {
		console.log(propertyKey)
		// zauważ że pułapka działa, jednak my nie zwracamy żadnej wartości
		// dlatego pola mają dają nam "undefined"
	}
})

console.log(someOtherSample.say)
console.log(someOtherSample.hello)

console.log(sideEffects.say)
console.log(sideEffects.hello)

// Zobaczmy inne pułapki, na przykład delete:

const myProject = new Proxy({}, {
	deleteProperty(target, propertyKey) {
		if (propertyKey in target){
			// faktycznie usuwamy:
			delete target[propertyKey]
			console.log('usuwam:',propertyKey)
			return true
		}
		console.log('nie znalazłem:', propertyKey)
		return false
	}
})

myProject.name = 'testing by';
myProject.startDate = new Date();

console.log(myProject);

delete myProject.startDate;

console.log(myProject);

delete myProject.startDate;

