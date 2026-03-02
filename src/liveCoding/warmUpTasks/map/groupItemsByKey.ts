/*
Problem: Group test results by status.

Example

Input: [{id:1,status:"passed"},{id:2,status:"failed"},{id:3,status:"passed"},{id:4,status:"failed"},{id:5,status:"passed"}]

Output: Map: "passed" -> [...], "failed" -> [...]

*/

type TestResult = { id: number; status: "passed" | "failed" | "skipped"  };

const tests: TestResult[] = [{id:1,status:"passed"},{id:2,status:"failed"},{id:3,status:"passed"},{id:4,status:"failed"},{id:5,status:"passed"}]


function groupTestsByStatus(results: TestResult[]): Map<TestResult["status"], Array<number>> {
  const grouped = new Map<TestResult["status"], Array<number>>();

  for (const r of results) {
    const arr = grouped.get(r.status);
    if (arr) arr.push(r.id);
    else grouped.set(r.status, [r.id]);
  }

  return grouped;
}

console.log(groupTestsByStatus(tests));