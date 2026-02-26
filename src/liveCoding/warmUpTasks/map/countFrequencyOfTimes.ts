/*
Problem: Count how many times each word occurs.

Example

Input: ["a","b","a"]

Output: { a: 2, b: 1 } (or Map equivalent)
*/

const words =  ["a","b","a"]

function countWords(words: string[]): Map<string, number> {
  const counts = new Map<string, number>();

  for (const w of words) {
    counts.set(w, (counts.get(w) ?? 0) + 1);
  }

  return counts;
}


console.log(countWords(words));

/* Explanation
•	Map.get() returns undefined if absent; ?? 0 converts it to 0.
•	Map is ideal for dynamic keys and frequent updates.
Complexity
•	Time: O(n) average
•	Space: O(k) where k = number of unique words
*/