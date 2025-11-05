import { assertThat } from '../../j4b1-assert.js'
/**
 * g20-using-proxy
 * Challenge
 *
 * Chcemy mieć jeden zabawny krzyczący obiekt dodający do każdego pola znak "!"
 * Nie chcemy aby ktokolwiek usuwał z niego pola!
 *
 * * Reguły:
 * - Kod można zmieniać tylko w środku handlera przekazanego do Proxy
 */

const shouterObject = new Proxy( {  }, {
	// #Reguła:
	// Kod piszemy tylko tutaj:

})

// #Reguła:
// Nie możesz zmieniać kodu poniżej:

shouterObject.name = 'Michal';
shouterObject.lastName = 'Kowalsky';
shouterObject.age = 33;
shouterObject.nothing = 'will-stay'

delete shouterObject.nothing;

assertThat(
	'Should have name shouted',
	expect => expect(shouterObject.name).toBe('Michal!')
)  //=
assertThat(
	'Should have lastName shouted',
	expect => expect(shouterObject.lastName).toBe('Kowalsky!')
)  //=
assertThat(
	'Nothing should not be deleted',
	expect => expect(shouterObject.nothing).toBe('will-stay!')
)  //=
assertThat(
	'Should have all properties shouted',
	expect => expect(shouterObject).toEqual({ name: 'Michal!', lastName: 'Kowalsky!', age: '33!', nothing: 'will-stay!' })
)  //=
