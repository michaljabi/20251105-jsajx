import { assertThat } from '../../j4b1-assert.js'

/**
 * g10-using-symbols
 * Challenge
 *
 * To znów my, Twoja dzielna drużyna z piwnicy.
 *
 * Moss wymyślił autoryzację działania użytkownika na podstawie hash'a.
 * Pole 'hash' ma być dostępne za pomocą stałej: hashSecretCode
 * Jednak chcemy aby ta wartość po zakończeniu działania programu i zapisaniu usera jako JSON
 * nie była dostępna, ani po serializacji, ani tym bardziej po deserializacji z JSON.
 *
 * Wszystko mamy już gotowe, jednak nie działa to poprawnie.
 * Sprawdź nasze testy i pomóc
 *
 * * Reguły:
 * - istniejący kod ma ZACHOWYWAć się podobnie
 * - jednak może zostać zmieniony za równo w kontekście typu zmiennej jak i zwracanego obiektu
 * - testy jednak muszą działać
 * - nie zmieniaj kodu tam gdzie jest to wyraźnie zaznaczone.
 */


const hashSecretCode = 'hash';

function makeAUser(name, hash) {
	 return {name, [hashSecretCode]: hash};
}

// #Reguła:
// Nie możesz zmieniać kodu poniżej:
const user1 = makeAUser('Kasia', '*WEY&*W%!*&W*R');
// Podczas działania programu chcemy mieć dostęp do specjalnego hashSecretCode
assertThat(
	'Secret hash should be present when program is working',
	expect => expect(user1[hashSecretCode]).toBe('*WEY&*W%!*&W*R')
) //=

const serializeUser1 = JSON.stringify(user1);
const unSerializedUser1 = JSON.parse(serializeUser1);
// Jednak po serializacji i deserializacji nie chcemy aby była możliwość odczytania sekretnego hash'a:
assertThat(
	'Secret hash should not be serialized and deserialized',
	expect => expect(unSerializedUser1[hashSecretCode]).toBe(undefined)
) //=
