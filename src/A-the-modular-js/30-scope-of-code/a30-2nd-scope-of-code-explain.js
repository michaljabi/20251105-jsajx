/**
 * a30-scope-of-code
 * Explain
 *
 * #Cel:
 * Poznanie sposobu działania zakresów w JavaScript.
 * Jeśli dana zmienna / stała nie jest znaleziona w inner scope, przeszukiwane są kolejne zakresy na zewnątrz,
 * aż do samego zakresu globalnego
 */

/*

	W JavaScript bardzo ważną rolę odgrywają tzw. zasięgi - SCOPE

	Chodzi o to że funkcja ma dostęp do tego co jest "na zewnątrz niej"
	będziemy to nazywać "outer scope"

	Pozwala nam to na wykorzystanie wartości, które zdefiniowane są poza funkcją.

	Zasięg na "samym szczycie" nazywany jest tzw. Global Scope
	Jednak wiemy, że w Node.js każdy plik ma własny zakres - więc nazywanie go "globalnym"
	jest technicznie delikatnym nadużyciem. Można jednak mówić o globalnym zakresie modułu.

	Faktyczny zasięg globalny w całym Node.js osiągamy odwołując się do obiektu:
	global

	Dla przypomnienia w przeglądarce to: window
*/

// a) Module Global SCOPE
const model = 'Q2'

function mySuperCar () {
	// b) local SCOPE of (mySuperCar)

	function getName() {
		return 'Audi'
	}

	console.log('Moje super auto to:')
	console.log(getName())
	console.log(model)
}

mySuperCar();

// Przykład powyżej pokazuje, że mamy dostęp do zewnętrznej wartości.
// Pytanie nr1. ok, to co się stanie, jeśli zagnieżdżeń jest więcej
// Dla szybkiego wykonania przykładu — wykorzystamy IFEE:



// Dla porządku: każda z tych funkcji mogłaby być anonimowa (nienazwana).
// tutaj jest to zrobione, aby łatwiej było określić, gdzie się znajdujemy.
// W rzeczywistym kodzie raczej nie spotkamy takich konstrukcji (😅).
// Służy ona wyłączenie sprawdzeniu, jak zachowuje się przeszukiwanie scope w JS.
const myColor = 'red';
(function inception() {
	const myColor = 'cristal';

	(function secondDream() {
		const myColor = 'sapphire';

		(function thirdDream() {
			const myColor = 'emerald';

			(function fourthDream() {
				const myColor = 'diamond';
				// komentuj po kolei idąc z tego scope odwołanie do stałem myColor - aby zobaczyć jak będzie się zachowywać
				console.log(myColor);
			})()
		})();
	})();
})();

// Przykład powyżej ukazuje jak JavaScript przeszukuje outer-scope jeśli nie znajdzie lokalnej zmiennej lub stałej,
// o którą prosimy.

// Zauważ że pokazana jest również inna sprawa
// To tzw. shadowing variable.
// Chodzi o to że jeśli zmienna w naszym scope nazywa się tak samo jak zmienna z outer-scope.
// Wtedy nie mamy możliwości się do niej odwołać

const myVariable = 123;

function sample() {
	const myVariable = 'Hello';
	console.log(myVariable);
	// Nie mam jak dostać się do outer scope
	// Musiałbym zmienić nazwę lokalnej zmiennej.

	// Jedno z pośrednich rozwiązań jak odnaleźć takie miejsca w kodzie:
	// ESLint - Linter do JavaScript
	// https://eslint.org/
	// i jego reguła: no-shadow
	// https://eslint.org/docs/rules/no-shadow
}

sample();


// DANGER ZONE:
// O tym jeszcze będzie mowa, jednak można zupełnie przypadkowo zadeklarować zmienną w global scope:
function findMyNewMug() {
	// "use strict"; // odkomentuj w odpowiednim momencie
	myMug = 'Moss sticker attached to bottom.'
	// Zmienna myMug nie była zadeklarowana w outer scope...
	// Co za tym idzie nie powinniśmy mieć możliwości jej nadpisania,
	// Jednak co się okazuje:
	console.log(myMug);
	// kod działa
}
findMyNewMug();

// To czego się nie spodziewaliśmy, to miejsce.
// Gdzie teraz mieszka zmienna "myMug" ???

// Wydaje się że nie wyciekła do outer scope!
// Na pewno jest lokalna...

// Jednak, rzeczywistość jest inna:
console.log(myMug);
// myMug, to teraz zmienna globalna:
console.log(global.myMug);

// Jedyne o czym zapomnieliśmy to słowo kluczowe, let albo const, w środku funkcji findMyNewMug
// Jak się przed tym bronić ?!

// używając tzw. strict mode dla JavaScript.
// wystarczy go dopisać na początku tego pliku lub nawet jako pierwsza linia w środku findMyNewMug
// jako:
// "use strict";
