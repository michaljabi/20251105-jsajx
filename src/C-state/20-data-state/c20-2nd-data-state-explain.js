import { produce } from 'immer'
import { assertThat } from '../../j4b1-assert.js'
/**
 * c20-data-state
 * Explain
 *
 * #Cel:
 * Przypomnienie pojęcia i znaczenia "stanu aplikacji" w kontekście budowy front-endu.
 * Poznanie biblioteki immer oferującej bardzo ciekawe API do modyfikacji danych bez ich mutowania.
 */

// Stan danych w naszej aplikacji można zdefiniować, jako pewien zasób informacji
//  - wokoło którego nasza web appka w ogóle działa.

// Przykładowo, gdybyśmy robili front-end przedstawiający listę z zakupami,
// Nasz "globalny" stan danych mógłby wyglądać następująco:

const state = {
	shoppingList: [
		{name: 'carrots', amount: '2kg', value: 10}
	]
}

// Cały "problem" związany ze stanem danych - to jego zmiana.
// Na pewno samo przedstawienie "Reprezentacji graficznej" - tego co widzimy powyżej
// Wykorzystując framework + komponenty, lub nawet czysty HTML - będzie dla każdego dość proste.
// To kwestia jedynie "ubrania" tych danych w jakieś GUI

// Zmiana tych danych w czasie, wiąże się jednak z koniecznością aktualizacji:
// Za równo stanu (co będzie stosunkowo proste) jak i wszystkich zainteresowanych
// Każdy komponent który korzysta z tych danych - musi zostać w jakiś sposób zaktualizowany.

// Rozważmy przykład, w którym dodajemy element do listy zakupów:

function mutableAddProduct(product = {}) {
	state.shoppingList.push(product);
	return state;
}

// W układzie powyżej mutujemy dane
// Może się to okazać bardzo kosztowne - z punktu widzenia aktualizacji i wykrywania zmian stanu
// To co omawialiśmy sobie w części c10.

// Niemutowanie danych wyglądało by np. następująco:

function addProduct(product = {}) {
	// state.shoppingList.push(product);
	return {
		...state,
		shoppingList: [
			...state.shoppingList,
			product
		]
	};
}

// Zobacz że przy tak małej strukturze danych - mamy masę pisania,
// Każde odniesienie jako referencje - musimy przekopiować.
// `addProduct` wykonuje to jako shallow copy.

// Zadania biblioteki immer możemy poniekąd porównać do zadań z Redux.
// Posiadamy zdefiniowane drzewo stanu i chcemy je aktualizować w czasie

// Zobaczmy jak takie kopiowanie stanu - będzie wyglądało w Immer:

function immerAddProduct(product = {}) {
	return produce(state, (draft) => {
		draft.shoppingList.push(product);
	});
}

// Zaraz, zaraz - to wygląda zupełnie tak jakbyśmy mutowali tablicę `shoppingList`
// Jednak zauważ że testy wykonane poniżej pokazują coś innego:

const previousState = state;

const nextState = immerAddProduct({ name: 'Lego', amount: '1kg', value: 200})

assertThat(
	'Previous state suppose to have 1 product',
	expect => expect(previousState.shoppingList.length).toBe(1)
)  //=
assertThat(
	'Next state suppose to have 2 products',
	expect => expect(nextState.shoppingList.length).toBe(2)
)  //=
assertThat(
	'We should be able to detect state change somehow!',
	expect => expect(previousState).notToBe(nextState)
)  //=
assertThat(
	'We suppose to have new shoppingList !',
	expect => expect(previousState.shoppingList).notToBe(nextState.shoppingList)
)  //=
assertThat(
	'both shoppingList should have same values',
	expect => expect(previousState.shoppingList).notToBe(nextState.shoppingList)
)  //=

// Cała "Magia" - dzieje się we wnętrzu "produce".
// To co do niej przekazujemy to aktualny stan, a w callbacku otrzymujemy tzw. draft.
// Co najlepsze - z draftem możemy postępować dowolnie, nawet mutować.
// Wykonywać wszystkie znane nam metody - dążąc do określenia nowego stanu.

// Immer finalnie zwróci nam nowy stan, ale jako sklonowaną strukturę:

console.log(nextState)

// Co więcej będzie ona domyślnie zabezpieczona jako "tylko do odczytu":
// Odkomentuj linię poniżej aby się o tym przekonać:
// nextState.shoppingList = []


// To sprawia - że możemy bez obaw w środku `produce` używać znanych nam metod, aby pod koniec - dostać nowy stan
// jako nowy obiekt
// zauważ również, że możemy śledzić co się zmieniło, ponieważ dane w tablicy - których nie modyfikowaliśmy
// zostają nienaruszone:
console.log(previousState === nextState)
console.log(previousState.shoppingList === nextState.shoppingList)
// dodałem nowy obiekt, ale stary został nienaruszony:
console.log(previousState.shoppingList[0] === nextState.shoppingList[0])

// Produce może działać również dla wycinka stanu:
// Razem z akcjami, na przykład:

const myFruitListState = { fruits: ['bananas'] };

const fruitReducer = produce((draft, action) => {
	switch(action.type) {
		case 'ADD_FRUIT':
			draft.fruits.push(action.payload);
			break;
	}
}, { fruits: [] })

console.log(myFruitListState)
const myNextFruitListState = fruitReducer(myFruitListState, {type: 'ADD_FRUIT', payload: 'cherries'})

// STAN NASTĘPNY:
console.log(myNextFruitListState);
// STAN POPRZEDNI (pozostaje nienaruszony):
console.log(myFruitListState);
// Stwarza to wiele różnych ciekawych pomysłów:

// Immera możemy np. połączyć z Reduxem - w celu uproszczenia zapisu reducerów:
// https://immerjs.github.io/immer/example-setstate#redux--immer
