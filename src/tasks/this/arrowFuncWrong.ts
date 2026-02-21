// why error TS2532: Object is possibly 'undefined'. Fix it
const user = {
  name: "Bob",
  greet: () => {
    console.log(this.name);
  }
};

user.greet();
