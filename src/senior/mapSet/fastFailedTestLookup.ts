const failedTests = ["login", "payment", "profile"];
const testName = "login"

/*
Naive solution
Big O: O(n)
*/
console.log(failedTests.includes(testName));

/* 
Senior solution
Big O: O(1)
*/

const failedTestsSet= new Set(failedTests);
console.log(failedTestsSet.has(testName)); 