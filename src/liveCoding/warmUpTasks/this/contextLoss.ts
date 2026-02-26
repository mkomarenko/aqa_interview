// Why does this result in TypeError: Cannot read properties of undefined (reading 'name') and fix it:
const user = {
    name: "John",
    getName() {
        return this.name;
    }
};

const fn = user.getName;
console.log(fn()); // undefined
