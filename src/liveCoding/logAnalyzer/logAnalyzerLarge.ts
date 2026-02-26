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
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    const counts = new Map();

    for await (const line of rl) {
        // Process line-by-line (Streaming)
        const level = line.match(/\]\s(\w+)\s/)?.[1]; 
        if (level) {
            counts.set(level, (counts.get(level) ?? 0) + 1);
        }
    }
    return counts;
}
/*
Detailed Explanation:
•	Streaming/Chunking: Instead of fs.readFileSync (which loads everything), we use createReadStream. This keeps the memory footprint constant, regardless of file size.
•	RegEx vs Split: Using a Regular Expression is more robust for data parsing than simple splitting.
•	Backpressure: A Senior candidate might mention "backpressure"—ensuring the data source doesn't overwhelm the data consumer.
*/


async function main() {
    logCounts = await processLargeLogFile(logPath);
    console.log(logCounts);
}

main()
