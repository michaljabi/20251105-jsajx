/**
 * e30-the-event-loop
 * Explain
 *
 * #Cel:
 * Wyjaśnienie sposobu działania JavaScript. W oparciu o STOS WYWOŁAŃ i Event Loop.
 */

// JavaScript jest jednowątkowy!
// Co w praktyce oznacza - że może robić jedną rzecz, w danym czasie.
// Tak właśnie zachowuje się tzw. Runtime dla JavaScript

// 1. W swoim wnętrzu posiada tzw. STOS WYWOŁAŃ.
// Stos to kolejka LIFO (Last In First Out);
// W praktyce oznacza to, że kod, który wykonujemy, funkcja po funkcji,
// wywołanie po wywołaniu - trafia na stos.

// Ostatnia rzecz na szczycie stosu - wykonuje się i dopiero, następuje wykonanie kolejnej.

// Gdyby w tym samym układzie działały: setTimeout, oraz np. XHR (Ajax Request)
// Wtedy - Wykonanie stosu, musiałby się BLOKOWAĆ!

// Na stos wchodzi SET TIMEOUT - czeka tam np. 5 sec. i dopiero wykonuje się kolejny kod ze stosu ?!
// Każdy kto używał kiedykolwiek setTimeout - wie że tak się nie dzieje.
// Pozostały kod się wykona niemal natychmiastowo! Natomiast callback z setTimeout przyjdzie do nas dopiero po 5 sec.

// Do całej tej układanki w przypadku Przeglądarki brakuje nam jeszcze WEB APIs i Event Loop

// 2. WEB APIS - to dostarczone przez przeglądarkę funkcjonalności, takie jak wspomniane:
// Timeouts, AjaxRequests itp. itd.

// To dzięki nim wywołanie np. setTimeout - nie powoduje "zablokowania" stosu.
// Zamiast tego setTimeout niejako "trafia na stos 2 razy".
// Za 1 razem wywołujemy setTimeout, trafia to wywołanie na stos, ale zostaje natychmiastowo zdjęte ze stosu przez WEB APIs
// To tam odliczany jest timeout (np. 5 sec) i dopiero wywołanie z Callback trafia....

// ... z powrotem na stos ?!
// NIE.

// Gdyby tak było - wykonane timeout'y i inne rzeczy - pojawiałby się nieoczekiwanie z protem,
// TUTAJ pojawiają się ostatnie elementy układanki:

// 3. Kolejka wywołań zwrotnych + EVENT LOOP.
// Callback który wraca z setTimeout - trafia na koniec kolejki wywołań zwrotnych.
// Kolejka ta - otrzymuje "zwroty" (callbacki) od WEB APIs przeglądarki.

// Tutaj wkracza Event Loop - ma ona jedno proste zadanie:

// - sprawdź czy stos jest pusty
// - jeśli jest pusty - wrzuć 1 callback z kolejki na stos.
// Event loop będzie postępować tak aż do momentu jak wszystkie zadania zejdą z kolejki.

// Do lepszego zrozumienia całego tego procesu, przydatna jest znajomość 2 rodzajów tasków w JS poniżej
// oraz narzędzie: Loupe:
// http://latentflip.com/loupe



// Dodatkowo w JavaScript można wyróżnić 2 rodzaje "tasków".
// https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide#Tasks_vs_microtasks

// 1 - TASKS:
// Taskiem nazywamy standardowo wykonywany kod w JS, który będzie szedł na stos wywołań - instrukcja po instrukcji
// Standardowo synchronicznie napisany kod,
// Callbacki,
// lub timeout / interval
// Zobacz kolejność wywołania tego kodu:

console.log('Hello')
setTimeout(() => console.log('I will execute in 0ms !'));
console.log('Hello Again')

// setTimeout pomimo tego że jest zapisane jako 2 instrukcja, wykona się jako ostatni
// dzieje się tak dlatego że jego wywołanie zostało "wysłane" do WebAPI
// Callback z WEB API - przyszedł natychmiastowo, ponieważ nie określiliśmy czasu,
// setTimeout wraca w ~0ms

// Jednak dlaczego nie widzimy go od razu ?!
// Ponieważ callback z WEB API trafił do kolejki...
// I czeka aż stos wywołań będzie pusty i dopiero się wywoła

// JEDNAKŻE ! Chwla, jest jeszcze jedna kolejka - której zadania mają pierwszeństwo:
// Kolejka Mikro-zadań
// Dlatego zanim zobaczymy powrót z setTimeout - pokażą się rzeczy zakolejkowane poniżej:

// 2 - MICROTASKS:
// Mikrotaski posiadają swoją własną kolejkę - która ma pierwszeństwo - jeśli stos wywołań jest pusty
// Z tej kolejki korzystają:
// Promises i np. obecny w przeglądarce tzw. MutationObserver oraz wywołanie `process.nextTick()` w Node.js
//

queueMicrotask(() => {
	console.log('1. Come on..., make something before any timeout!')
})
Promise.resolve('').then(() => {
	console.log('2. Come on..., make something before any timeout!')
})

// Jeśli odkomentujesz kod poniżej, będzie on miał pierwszeństwo w kolejce wywołań mikro-zadań
// polecenie to jest możliwe (obecne) tylko w Node.js
// w pozostałych Environment'ach JSa mamy dostępne `queueMicrotask`

process.nextTick(() => {
	console.log('0. Next TICK 😎')
})


// 3 - KOLEJKA RENDEROWANIA
// W przeglądarce mamy jeszcze kolejkę: renderowania, która znów, ma pierwszeństwo przed zadaniami,
// Których callbacki wracają z WEB API - jednak może się wykonać DOPIERO GDY kolejka microtasks - jest pusta.

// W przeglądarce posiadamy funkcję:
/*
requestAnimationFrame(() => {
	console.log('render me !')
})
*/

// Wrzuca ona callback na kolejkę renderowania i wykona go tak szybko jak nie będzie już na stosie zadań,
// a kolejka microtask - będzie pusta.

// Spróbuj w tym układzie zgadnąć jaka będzie kolejność wywołań w tym kodzie poniżej
// później wklej go do konsoli przeglądarki i sprawdź - czy masz rację !
/*
		console.log('[] start');
		setTimeout(() => console.log('[] setTimeout 0'));
		requestAnimationFrame(() => console.log('[] requestAnimationFrame'));
		Promise.resolve().then(() => console.log('[] Promise.resolve'));
		console.log('[] end');
*/


// CIEKAWOSTKA:

// Biorąc pod uwagę fakt, że nasza kolejka zadań jako pierwsze po rozładowaniu kolejki microtask,
// wrzuci callback z setTimeout, to dodanie kolejnego, sprawi że znajdzie się on na samym końcu naszej stawki:

/*
		setTimeout(() => {
			console.log('I am on the end...')
		})
 */

// mamy jednak funkcję przyjmującą callback, powalającą nam zająć 1 miejsce w kolejce przed callbackami z setTimeout:

/*
		setImmediate(() => {
			console.log('===> Before 0ms timeouts! 😎')
		})
 */
// UWAGA:
// setImmediate - nie jest standardem, nie znajdziemy tego np. w Chrome, (w przeglądarkach jest bodaj tylko w IE)
// Istnieje jednak w Node.js
// https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/#setimmediate-vs-settimeout

// Dokładniejszy opis Event Loop i tasków w Node.js:
// https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/#event-loop-explained

console.log('------------------ Program ENDS ?!')
