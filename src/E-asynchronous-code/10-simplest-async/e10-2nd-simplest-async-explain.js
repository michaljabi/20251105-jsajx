/**
 * e10-simplest-async
 * Explain
 *
 * #Cel:
 * Poznanie wywołania zwrotnego (tzw. callback).
 * Do funkcji przekazuje funkcję - i to ona decyduje z jakimi argumentami i kiedy przekazana funkcja
 * zostanie wywołana.
 */

// Najprostszym sposobem uzyskania asynchroniczności - jest funkcja.
//
// Wystarczy że zamkniemy kawałek kodu w jej definicji.
// Jeszcze nic się nie wykonało:

function greetings() {
	console.log('Welcome on board!')
}

// teraz, definicja funkcji może zostać przekazana do wywołania innej funkcji.
// lub może być "sięgnięta" z tzw. outer scope.

// Rozpatrzmy przypadek 1)
// Skorzystanie z outer scope:

function makeSomethingWhenYouRReady() {
	//can be setTimeout or so...
	//... wait
	//... not yet
	//... ok - NOW!
	greetings();
}

// Kod jest przygotowany, czas go wywołać:
makeSomethingWhenYouRReady();

// Jakie mamy tutaj problemy:
// 0. Póki co to oczywiście jest symulacja - więc fakt, że greetings() uruchamia się asynchronicznie - trzeba sobie wyobrazić
// 1. Cała ta konstrukcja jest "zahardkodowana"
// I tutaj właśnie jest cały ból...
// Masa rzeczy może się tutaj posypać:
// - funkcja greetings zmieni nazwę
// - funkcja greetings zmieni scope lub inna nazwa zmiennej zakryje greetings
// - wreszcie: nie mamy możliwości zmiany wywołania kodu z makeSomethingWhenYouRReady, tam zawsze wywoła się greetings



// Rozpatrzmy przypadek 2)
// przekazanie do wywołania innej funkcji
// inaczej zwany: "Callback"

function iWIllGiveYouSomethingToMakeWhenYouRReady(something) {
	//can be setTimeout or so...
	//... wait
	//... not yet
	//... ok - NOW!
	something();
}

// Kod jest przygotowany, czas go wywołać:
iWIllGiveYouSomethingToMakeWhenYouRReady(() => {
	console.log('hello')
});

// W tym układzie rozwiązujemy wszystkie problemy - minusy poprzedniego rozwiązania.
// Przekazujemy do wykonania jakąś funkcję (something)
// Dodatkowo - możemy z wnętrza `iWIllGiveYouSomethingToMakeWhenYouRReady` komunikować się i "wrzucać"
// do parametrów funkcji `something` - argumenty z wnętrza funkcji `iWIllGiveYouSomethingToMakeWhenYouRReady`

// Odpowiednikiem tego przykładu może być rejestracja eventHandler'a dla event'u "click" na buttonie w DOM.
