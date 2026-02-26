/* 
The Challenge: You are given an array of log strings. Each string follows the format: "[TIMESTAMP] LEVEL MESSAGE".

    1. Parse the logs to count the occurrences of each log level (INFO, ERROR, WARN).

    2. Filter and return the top N most frequent error messages.

    3. Refactor the solution to handle a theoretical 10GB file.

*/

const logs = [
    "[2024-03-01 10:00:00] INFO User logged in",
    "[2024-03-01 10:01:00] ERROR Database connection failed",
    "[2024-03-01 10:02:00] ERROR Database connection failed",
    "[2024-03-01 10:03:00] WARN Low disk space",
    "[2024-03-01 10:04:00] ERROR Timeout reached",
    "[2024-03-01 10:05:00] WARN High memory usage detected",
    "[2024-03-01 10:06:00] ERROR Failed to write to disk",
    "[2024-03-01 10:07:00] WARN API response time degraded",
    "[2024-03-01 10:06:00] ERROR Failed to write to disk",
];

function analyzeLogs(logs: string[]) {
    const counts: Map<string, number> = new Map();
    const errorMessages: Map<string, number> = new Map();

    logs.forEach((log: string) => {
        // Simple parsing using split
        const parts = log.split(' ');
        const level = parts[2]; // [2024-03-01, 10:00:00], INFO, ...
        const message = parts.slice(3).join(' ');

        // Aggregate levels
        if (level) {
            counts.set(level, (counts.get(level) ?? 0) + 1);

            // Collect error messages specifically
            if (level === 'ERROR') {
                errorMessages.set(message, (errorMessages.get(message) ?? 0) + 1);
            }
        }
    });

    return { counts, errorMessages };
}
/*
Detailed Explanation:
•	Decomposition: The candidate breaks the string into components. Using .split(' ') is a quick start, though fragile if messages have extra spaces.
•	Data Structure: Using a Hash Map (Object) ensures $O(1)$ average time complexity for lookups and insertions.
•	Trade-off: This is easy to read but loads the entire logs array into memory. If logs is massive, the program crashes (Heap out of memory).
*/


function getTopErrors(errorMap: Map<string, number>, n: number = 3) {
    return Array.from(errorMap.entries())
        .sort((a, b) => b[1] - a[1]) // Sort by frequency descending
        .slice(0, n)
        .map(entry => entry[0]);
}
/*
Detailed Explanation:
•	Complexity: The candidate should identify that sort() takes $O(K \log K)$ where $K$ is the number of unique error messages.
•	Follow-up Question: "What if we have 1 million unique errors but only need the Top 3?"
o	Better Answer: A Min-Heap would be more efficient ($O(K \log N)$), but for a Middle role, acknowledging the cost of a full sort is usually sufficient.
*/



let result = analyzeLogs(logs);

console.log(result.counts)
console.log(result.errorMessages)
console.log(getTopErrors(result.errorMessages, 3));