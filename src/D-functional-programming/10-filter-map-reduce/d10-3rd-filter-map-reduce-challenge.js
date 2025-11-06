import { assertThat } from '../../j4b1-assert.js'
/**
 * d10-filter-map-reduce
 * Challenge
 *
 *  W naszej złożonej aplikacji część komponentów, potrzebuje danych w specjalnej formie,
 *  aby je poprawnie wyświetlić.
 *
 *  Postaraj się wykorzystać programowanie funkcyjne do osiągnięcia odpowiedniego formatu danych,
 *  tak aby każdy z komponentów mógł je obsługiwać.
 *
 * * Reguły:
 * - nie zmieniaj danych które przychodzą z pseud-backendu bezpośrednio na tablicy (nie ruszaj backendApiRequest)
 * - w przestrzeni tego scope muszą się zanjdować showNamesOnly, showWomanNamesOnly, showEmailsWithDomainSiteCom
 *   zawierające odpowiednio tablice z wynikami działań.
 * - zastosuj odpowiednie metody tablicowe aby uzyskać wyniki.
 */

// Nie zmieniaj tego kodu:
const backendApiRequest = () => [
	'adrian@site.com',
	'stefan@site.com',
	'jadwiga@domain.pl',
	'henryka@domain.pl',
	'anna@site.com'
];
const emailData = backendApiRequest();

const isEmailEndWithSiteCom = email => email.toLowerCase().endsWith('@site.com');
const isAWomanName = name => name.toLowerCase().endsWith('a');

const extractName = email => {
	const [name] = email.split('@')
	return name
}

const capitlize = word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();


console.log('HELLO')
console.log('HELLO'[1]);
console.log(''[0]);
console.log(''.charAt(0));

console.log(isAWomanName('Michał'))
console.log(isAWomanName('Anna'))

// Tutaj możesz pisać:
const showNamesOnly = emailData.map(extractName).map(capitlize);
console.log(showNamesOnly)

const showWomanNamesOnly = showNamesOnly.filter(isAWomanName);
const showEmailsWithDomainSiteCom = emailData.filter((email) => {
	console.log(email)
	return email.endsWith('@site.com');
});
// const showEmailsWithDomainSiteCom = emailData.filter(isEmailEndWithSiteCom);

console.log(showEmailsWithDomainSiteCom)

const myName = 'adrian@site.com';

myName.split('@')[0] //=

// #Reguła:
// Nie możesz zmieniać kodu poniżej:
assertThat(
	'First component should consume data as Capitalized names',
	expect => expect(showNamesOnly).toEqual(['Adrian', 'Stefan', 'Jadwiga', 'Henryka', 'Anna'])
)  //=

assertThat(
	'Second component should consume data as Woman names only',
	expect => expect(showWomanNamesOnly).toEqual(['Jadwiga','Henryka','Anna'])
)  //=

assertThat(
	'Third component should have @site.com emails as data provided',
	expect => expect(showEmailsWithDomainSiteCom).toEqual(['adrian@site.com','stefan@site.com','anna@site.com'])
)  //=


// tablica bazowa jest nietknięta:
console.log(emailData);