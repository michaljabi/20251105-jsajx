import { assertThat } from '../../j4b1-assert.js'
/**
 * b40-cloning
 * Challenge
 *
 * Naszym zadaniem było napisanie aplikacji do pisania własnych tekstów,
 * Coś a'la OpenOffice / LibreOffice / Word .... etc.
 *
 * Oddaliśmy w poprzednim sprincie wersje POC.
 * Póki co tekst dopisywany jest jako jeden paragraf.
 * Chcemy obliczać stan następny na podstawie poprzedniego.
 * Jednak nie działa to tak jak wszyscy by się spodziewali.
 *
 * Nie można w tej wersji "Cofać zmian" wpisanego tekstu przez użytkownika, ponieważ nie wiemy,
 * jaki był poprzedni krok. Mamy cały czas ostatni krok, pomimo tego, że niby rejestrujemy każdy krok z osobna.
 *
 * Ustaliliśmy, że błąd leży jedynie w naszej funkcji calculateNewParagraphState.
 * Proszę, sprawdź jak możemy "zapamiętywać" poprzednie kroki podejmowane przez użytkownika
 * i utworzyć takiego "loga" wpisywanych tekstów krok po kroku ?
 *
 * * Reguły:
 * - nie możesz zmieniać nic, poza funkcją: calculateNewParagraphState
 * - pisz i zmieniaj dowolnie kod w funkcji calculateNewParagraphState
 */

const initialTypeState = {
	paragraphTextContent: ''
}

// Funkcja obliczająca stan następny na podstawie stanu poprzedniego
function calculateNewParagraphState(currentState = initialTypeState, paragraphText = '') {
	  currentState.paragraphTextContent += paragraphText;
	  return currentState;
}

// Nasza symulacja pisania czegoś przez usera:
const changeDetectionModule = (function(){

	// #Event1: [init program]
	const state1 = calculateNewParagraphState();
	// #Event2: [user typed: 'Have']
	const state2 = calculateNewParagraphState(state1, 'Have')
	// #Event3: [user typed: ' you tried']
	const state3 = calculateNewParagraphState(state2, ' you tried')
	// #Event4: [user typed: ' to turn it off and on again?']
	const state4 = calculateNewParagraphState(state3, ' to turn it off and on again?')

	// Pogląd zmieniającego się w czasie stanu
	// Zwracamy kolejne kroki podejmowanie przez usera:
	return [state1, state2, state3, state4]
})()


// #Reguła:
// Nie możesz zmieniać asercji poniżej:

// Pomocnicza destrukturyzacja kolejnych stanów aplikacji:
const [first, second, third, forth] = changeDetectionModule;

assertThat(
	'At the init program, the state should be empty',
	expect => expect(first.paragraphTextContent).toBe('')
)  //=
assertThat(
	'Next, there should be a "Have" in the paragraph',
	expect => expect(second.paragraphTextContent).toBe('Have')
)  //=
assertThat(
	'Next, there should be a "Have you tried" in the paragraph',
	expect => expect(third.paragraphTextContent).toBe('Have you tried')
)  //=
assertThat(
	'Next, there should be a whole sentence inside a paragraph',
	expect => expect(forth.paragraphTextContent).toBe('Have you tried to turn it off and on again?')
)  //=
assertThat(
	'States are not the same object in memory',
	expect => expect(first === second && second === third && third === forth).toBe(false)
)  //=

