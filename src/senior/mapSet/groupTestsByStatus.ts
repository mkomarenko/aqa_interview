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

interface Test {
  name: string;
  status: string;
}

const tests = [
  { name: "login", status: "passed" },
  { name: "payment", status: "failed" },
  { name: "profile", status: "passed" },
];

function groupByT<T, K extends keyof T>(items: T[], key: K): Map<T[K], T[]> {
  let result: Map<T[K], T[]> = new Map();

  for (let item of items) {
    let groupKey = item[key];

    if (!result.get(groupKey)) {
      result.set(groupKey, []);
    }
    result.get(groupKey)!.push(item);
  }
  return result;
}

const grouppedTests = groupByT(tests, "status");
for (let item of grouppedTests) {
  console.log(item[0]);
  for (let test of item[1]) {
    console.log(test);
  }
}
