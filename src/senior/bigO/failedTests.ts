const tests = [
 { id: 1, name: "login"},
 { id: 2, name: "payment"},
 { id: 3, name: "profile"},
];

const failedIds = [1, 3];

/* Bad code (Big O: O(n^2))
const failedTests = tests.filter(test =>
  failedIds.includes(test.id)
);
*/

// Good code (Big O: O(n))
const failedIdsSet = new Set<number>(failedIds);
const failedTests = tests.filter(test => 
    failedIdsSet.has(test.id)
);

console.log(JSON.stringify(failedTests));