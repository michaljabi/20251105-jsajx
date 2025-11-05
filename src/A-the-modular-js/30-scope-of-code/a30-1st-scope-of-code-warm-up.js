import { assertThat } from "../../j4b1-assert.js";
/**
 * a30-scope-of-code
 * Warm up
 *
 * * Reguły:
 * - nie możesz zmieniać istniejącego kodu
 * - dopisuj kod tylko tam gdzie wyraźnie napisane jest, że można
 */
let fullName = "";

function computeFullName() {
  const firstName = "John";
  const lastName = "Kowalsky";
  // Kod możesz pisać tylko w tym miejscu:
}

computeFullName();

// #Reguła:
// Nie możesz zmieniać kodu poniżej:
assertThat('Should have fullName of "John Kowalsky"', (expect) =>
  expect(fullName).toBe("John Kowalsky")
); //=
