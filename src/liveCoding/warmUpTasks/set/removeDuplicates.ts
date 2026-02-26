/* 
Remove duplicates while preserving order

Problem: Given an array of strings, return a new array with duplicates removed, keeping the first occurrence order.

Example

Input: ["a","b","a","c","b"]

Output: ["a","b","c"]

*/

const values = ["a","b","a","c","b"]

function uniquePreserveOrder(values: string[]): string[] {
  return [...new Set(values)];
}


console.log(uniquePreserveOrder(values));

/*
Explanation
•	Set keeps only unique values.
•	Iteration order in Set is insertion order, so the first occurrence is preserved.
Complexity
•	Time: O(n) average
•	Space: O(n)
*/