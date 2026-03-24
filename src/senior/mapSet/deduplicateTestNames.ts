const tests = [
  "login",
  "payment",
  "login",
  "profile",
  "payment"
];


/* 
Naive solution 
indexOf() inside filter()
Big O: O(n^2)
*/
let unique = tests.filter((item, index) =>
  tests.indexOf(item) === index
);

console.log(unique);

/*
Senior solution
Big O: O(n)
*/
unique = [...new Set(tests)];
console.log(unique);
