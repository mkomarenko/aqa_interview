/*
Group Tests By Status:
Given:

[
  { name: "login", status: "passed" },
  { name: "payment", status: "failed" },
  { name: "profile", status: "passed" }
]

Need to get:

{
 passed: [...],
 failed: [...]
}

*/

const tests = [
  { name: "login", status: "passed" },
  { name: "payment", status: "failed" },
  { name: "profile", status: "passed" }
]

function groupTestsByStatus(tests: Array<{name: string, status: string}>): Map<string, Array<string>> {
    let groupedTestsMap: Map<string, Array<string>> = new Map();

    for (let test of tests) {
        let testsArr = groupedTestsMap.get(test.status);
        if (testsArr) {
            testsArr.push(test.name)
        } else {
            testsArr = new Array();
            testsArr.push(test.name);
            groupedTestsMap.set(test.status, testsArr)
        }
    }
    return groupedTestsMap;
}

console.log(groupTestsByStatus(tests));