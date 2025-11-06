let x = 1;
let z = x;


x++;
x++;
x++;
console.log(x);

z++;
console.log(z);

console.log(x);
console.log(z);
// to były typy proste;

let o = {};
let o2 = o;


o.name = 'Michał';

console.log(o);

o2.lastName = 'Kowalski';

console.log(o2);
console.log(o);



// Gdzies dalej w kodzie:



function addName(user) {

    // Shallow copy obiektu bazowego
    // co oznacza Shallow -> w skrócie, jeśli ten obiekt nie ma innych obiektów / referencji - to jest OK.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    const myUser = { ...user };
    //const myUser = Object.assign({}, user);

    // Object.assign() => odpowiednik dla ... ale [!] Jeśli wowołasz tak: 
    // const myUser = Object.assign({}, user);

    myUser.name = 'Michał';

    return myUser;
}


let u = {};
u = { age: 10 /*, address: {}*/ };

console.log(addName(u));

console.log(u);