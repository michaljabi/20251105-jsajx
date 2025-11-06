const a = [1, 2];
const b = [40, 60];

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
console.log([...a, ...b]); //
console.log([].concat(a, b)); //

console.log(a);
console.log(b);

// Obiekty:
const user = { name: "Michał" };
const adminUser = { isAdmin: true };

// zadanie, chce mieć 1 obiekt taki: { name: 'Michał', isAdmin: true }

const adminMichal = { name: user.name, isAdmin: adminUser.isAdmin };
console.log(adminMichal);

// można wygodniej tak, używajac spread syntax:
const adminSpread = { ...user, ...adminUser };

console.log(adminSpread);
