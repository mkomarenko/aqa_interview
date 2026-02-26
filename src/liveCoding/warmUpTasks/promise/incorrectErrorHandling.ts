// What’s wrong?

async function main() {
try {
  Promise.reject(new Error("boom"));
} catch (e) {
  console.log("caught");
}
}

main();