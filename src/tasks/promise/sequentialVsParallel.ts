// You have two fetch calls: fetch('google.com') and fetch('bing.com'). Show sequential and parallel execution. 

async function sequential() {
  // TODO: implement sequential execution of fetch calls
}

async function parallel() {
  // TODO: implement parallel execution of fetch calls
}

async function main() {
  const results1 = await sequential();
  console.log(results1);
  const results2 = await parallel();
  console.log(results2);
}

main();