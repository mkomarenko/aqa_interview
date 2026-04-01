/*
Input:
[
 "login",
 "payment",
 "login",
 "profile",
 "payment"
]

Output:
[
 "login",
 "payment"
]

*/

const tests = [
 "login",
 "payment",
 "login",
 "profile",
 "payment"
]

// Big O: O(n)
function findDuplicateTests(tests: string[]): string[] {
    let duplicateTests = new Set<string>();
    let seen  = new Set<string>();
    
    for (const test of tests) {
        if (!seen.has(test)) {
            seen.add(test)
        } else {
            duplicateTests.add(test);
        }
    }
    return [...duplicateTests];
}

console.log(findDuplicateTests(tests));
