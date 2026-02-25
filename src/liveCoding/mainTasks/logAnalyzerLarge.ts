/* 
The Challenge: You are given an array of log strings. Each string follows the format: "[TIMESTAMP] LEVEL MESSAGE".

    1. Parse the logs to count the occurrences of each log level (INFO, ERROR, WARN).

    2. Filter and return the top N most frequent error messages.

    3. Refactor the solution to handle a theoretical 10GB file.

*/
const fs = require('fs');
const readline = require('readline')

const logPath = './data/logs_1mb.txt'

let logCounts;



async function processLargeLogFile(filePath: string) {
    // Implement it
}

async function main() {
    logCounts = await processLargeLogFile(logPath);
    console.log(logCounts);
}

main()
