import { assertThat } from '../../j4b1-assert.js'
/**
 * c10-immutability
 * Explain
 *
 * #Cel:
 * Niemutowanie danych wejściowych, lub istniejących danych w pamięci - okazuje się kluczowe w pewnych momentach działania naszej aplikacji.
 * Dotyczy to na przykład stanu, gdzie nie chcemy np. po przefiltrowaniu listy danych - zostawić ich w tej "okrojonej" formie.
 * Również pisząc funkcje i metody w aplikacji - nie chcemy naruszać danych wejściowych (argumentów),
 * tak aby nasz kod zachowywał się przewidywalnie.
 */

// Niemutowanie danych - to pewna koncepcja.
// Sprawdza się ona np. podczas utrzymywania stanu aplikacji - pytanie tylko: dlaczego ?

// Zacznijmy od początku 😀

// Najpierw wyjaśnimy sobie w jakich okolicznościach mutowanie danych jest złe:

// Przykład 1:
// Funkcja która dodaje wykrzyknik do każdego zdania:
function addBang(sentence) {
	return sentence + '!';
}

const mySentence = 'Hello World';
const otherSentence = addBang(mySentence);

assertThat(
	'otherSentence should have exclamation sign on the end',
	expect => expect(otherSentence).toBe('Hello World!')
); //=
assertThat(
	'mySentence should stay intact',
	expect => expect(mySentence).toBe('Hello World')
); //=
assertThat(
	'both sentences should not be the same',
	expect => expect(mySentence).notToBe(otherSentence)
); //=

// Tutaj nie następuje mutacja ?!
// Dokładnie, dzieje się tak dlatego - że nie da sie "mutować" typów prostych (primitive types)
// Są one przekazywane przez wartości

// Przykład 1 - ten właściwy
// O Mutowaniu mówmy w momencie, w którym mamy do dyspozycji przekazywanie danych przez tzw. referencję
// Przypomnij sobie informację zawarte w ../B-objectivity/b40-cloning-example.js
// Delikatnie zmieniając przykład - możemy już zauważyć mutację:

function addBangToWord(objectWithWord) {
	objectWithWord.word += '!';
	return objectWithWord;
}

const myObject = { word: 'Hello' };
// teraz wywołanie:
const myOtherObject = addBangToWord(myObject);

// Sprawdzenie czy pokazują na to samo miejsce w pamięci:
console.log(myObject === myOtherObject);
// Podejrzenie czy mamy mutację:
console.log(myObject);
console.log(myOtherObject);

// Niestety obiekt `myObject` oraz `myOtherObject` - to to samo miejsce w pamięci.
// Dzieje się tak dlatego - że w środku naszej funkcji `addBangToWord`
// Odczytaliśmy pole z referencji do obiektu i dodaliśmy do niego dane.

// Zauważ, że w tym kontekście nasza funkcja addBangToWord zachowuje się "niedeterministycznie".
// Nie do końca możemy chcieć aby po wrzuceniu do niej argumentu - został on modyfikowany.
// Lepiej żeby funkcja zwróciła wynik jako nowy obiekt ze słowem i wykrzyknikiem.

// Poprawiamy implementację:

function nonMutatingAddBangToWord(objectWithWord) {
	return {
		...objectWithWord,
		word: objectWithWord.word + '!'
	};
}

const myObject2 = { word: 'Hello' };
// teraz wywołanie:
const myOtherObject2 = nonMutatingAddBangToWord(myObject2);

// Sprawdzenie czy pokazują na to samo miejsce w pamięci:
console.log(myObject2 === myOtherObject2);
// Podejrzenie czy mamy mutację:
console.log(myObject2);
console.log(myOtherObject2);


// Teraz wszystko zachowuje się przewidywalne.
// Nie mutujemy przekazanych danych.


// Oto więc - nasza #1 motywacja do "niemutowania" danych.


// O co chodzi jednak ze stanem danych ?
// Tutaj musimy sobie wyobrazić stan danych jako obiekt - drzewo np.:

const myCoffeeState = {
	coffeeBeans: ['Arabica', 'Robusta'],
	coffeeMachine: {
		water: 200,
		coffee: 300,
		status: 'AWAITING',
		groundContainer: {
			status: 'EMPTY'
		}
	},
}

// Przypomnij sobie problem z zadania: ./b40-3rd-cloning-challenge.js

// W aplikacji będziemy chcieli modyfikować stan danych, zmieniać go.
// Jednak jeśli będziemy to robić bezpośrednio na obiekcie - to jak zorientujemy się czy cokolwiek zostało zmienione ?

// Innymi słowy - co by było jakbyśmy potrzebowali informacji - co się zmieniło?
// Wydaje się to być proste - przecież możemy dorobić odpowiedni mechanizm obserwowania zmian.
// Jednak na dłużą metę z bardziej skomplikowanym drzewem stanu - okaże się, że musimy sprawdzać "gałąź po gałęzi"
// co się zmieniło...

// To będzie bardzo kosztowne. Czy nie dałoby się łatwiej określić do się zmieniło ?

// Da się, za pomocą !==
// Wystarczy tylko - żebyśmy zamiast mutacji - obiekty zagnieżdżone w stanie - zastępowali nowymi.

// Oto więc powstaje - nasza #2 motywacja do "niemutowania" danych.
// Jeśli chcemy wiedzieć co zmieniło się na drzewie danych.

// Rozpatrzmy mutującą zmianę stanu groundContainer na status: FULL

// RĘCZNA, ZMIANA STANU (tutaj możemy wyobrazić sobie jakąś akcję):
const changedState = myCoffeeState;
const previousGroundContainer = myCoffeeState.coffeeMachine.groundContainer;
changedState.coffeeMachine.groundContainer.status = 'FULL';
const activeGroundContainer = changedState.coffeeMachine.groundContainer;
console.log(activeGroundContainer.status)

// Programistyczne nie wiemy o zmianie:
console.log(
	previousGroundContainer !== activeGroundContainer
)

// Teraz wiemy co się zmieniło jeśli widzimy to z tej strony.
// Jednak komponent prezentujący na widoku dane z groundContainer - nie odświeży się.
// Możemy to rozwiązać - kosztownie:
//  a) odświeżając wszystkie komponenty - każdy dostanie informacje o tym że ma się re-renderować !
//  b) sprawdzając ręcznie, pole po polu co zmieniło się na drzewie stanu...

// Obydwa te wyjścia będą kosztowne.
// a) - niewydajne przeliczanie i przerysowywanie aplikacji
// b) - póki drzewo stanu jest małe - nie ma problemu, jednak jeśli się rozwinie (większe aplikacje),
//      porównywanie każdej wartości pole po polu - dostanie zadyszki

// Rozpatrzmy teraz taką samą zmianę stanu bez mutowania części stanu:
const changedStateAgain = myCoffeeState;
const previousGroundContainer2 = myCoffeeState.coffeeMachine.groundContainer;
changedStateAgain.coffeeMachine.groundContainer = {...previousGroundContainer2, status: 'ALMOST_FULL'};
const activeGroundContainer2 = changedStateAgain.coffeeMachine.groundContainer;
console.log(activeGroundContainer2.status)

// Programistyczne (WOW) Wiemy co się zmieniło:
console.log(
	previousGroundContainer2 !== activeGroundContainer2
)

// Możemy dzięki temu zapisywać akcje zmiany stanu i wycinki stanu,
// Robić time travel debugging
// I zapisywać "logi" naszych zdarzeń
// Finalnie pozwala nam to "odbudowywać" stan aplikacji.
