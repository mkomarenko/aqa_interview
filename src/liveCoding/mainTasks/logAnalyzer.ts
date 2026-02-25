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

let logCounts;
let errorMessages;
let topErrors;

// Here should be an implementation

console.log(logCounts)
console.log(errorMessages)
console.log(topErrors)