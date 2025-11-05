
const user = {
    name: 'Kate',
    lastName: 'Moss',
};


(function standardApproach() {

    const name = user.name;
    const lastName = user.lastName;

    console.log(name, lastName);
}());


(function objectDestructuring() {

    const { name, lastName } = user;

    console.log(name, lastName);
}());

export { };