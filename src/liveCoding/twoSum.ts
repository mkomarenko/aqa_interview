/*
Problem: Return indices of two numbers that sum to a target.

Example

Input: [2,7,11,15], target 9

Output: [0,1]

*/

const nums = [2,7,11,15]

// Efficient solution using a hash map (O(n) time complexity)
function twoSum(nums: number[], target: number): [number, number] | null {
  const seen = new Map<number, number>(); // value -> index

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    const need = target - num;
    const j = seen.get(need);
    if (j !== undefined) return [j, i];
    seen.set(num, i);
  }

  return null;
}

// Brute-force (O(n²)) solution 
/*
function twoSum(nums: number[], target: number): [number, number] | null {
    for (let i =0; i < nums.length - 1; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i,j]
            }
        }
    }
    return null;
}
*/

console.log(twoSum(nums, 9));

/*
Step-by-Step Time Complexity Analysis

Let’s assume:

n = nums.length
1️⃣ Outer Loop
for (let i = 0; i < nums.length; i++)

This runs n times.

So by itself, this loop is O(n).

2️⃣ Inner Loop
for (let j = i + 1; j < nums.length; j++)

This loop depends on i.

When:

i = 0 → inner loop runs n - 1 times

i = 1 → inner loop runs n - 2 times

i = 2 → inner loop runs n - 3 times

...

i = n - 1 → inner loop runs 0 times

So the total number of inner loop executions is:

(n - 1) + (n - 2) + (n - 3) + ... + 1

This is a well-known arithmetic series.

3️⃣ Summing the Work

The formula for:

1 + 2 + 3 + ... + (n - 1)

is:

(n - 1) * n / 2

Which simplifies to approximately:

n² / 2
4️⃣ Big-O Simplification

In Big-O notation:

We ignore constants (like /2)

We keep only the highest-order term

So:

n² / 2  →  O(n²)
🔍 Intuition

Even though:

The inner loop runs slightly fewer times each iteration,

It still forms a triangular number of comparisons.

Visually:

i=0 → compare with n-1 elements
i=1 → compare with n-2 elements
i=2 → compare with n-3 elements
...

That pattern grows proportionally to n × n.

📌 Worst-Case Scenario

Big-O describes the worst case.

Worst case happens when:

The pair is at the very end, OR

There is no solution

In that case, we check every possible pair.

Number of pairs in an array:

n(n - 1) / 2

Which is proportional to:

n²
🚀 Why the HashMap Version is Faster

The optimized solution avoids checking all pairs.

Instead of:

"Check every pair"

It does:

"For each number, instantly check if its complement exists"

That removes one loop → reducing time from O(n²) to O(n).

🧠 Simple Mental Model

Whenever you see:

for (...) {
    for (...) {
        ...
    }
}

Ask:

Does the inner loop depend on n?

Does it run roughly n times?

If yes → very likely O(n²).

*/