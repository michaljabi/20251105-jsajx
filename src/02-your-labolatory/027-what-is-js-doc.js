// @ts-check


// Wnioski:
// 1. Użycie JSDoc poprawia nasz kod
// 2. JSDoc współpracuje z TS Server
// 3. JSDoc niestety "kosztuje" utrzymanie, czyli jesli dodamy 

/**
 * @param {number} a - 1st number
 * @param {number} b - 2nd number
 * @param {number} [c=0] - 3rd number
 * @returns {number} - sum of the both numbers
 */
function sum(a , b, c = 0) {
    return a + b + c;
}

sum();

sum(0, 1, 3)

sum('a', 'b')








