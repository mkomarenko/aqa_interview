const durations = [10, 20, 30];
const totalTime = durations.reduce((accumulator, current) => accumulator + current, 0)

console.log(totalTime);