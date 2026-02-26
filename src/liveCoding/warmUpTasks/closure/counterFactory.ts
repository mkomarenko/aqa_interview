function createCounter() {
  let count = 0;
  return function () {
    count += 1;
    return count;
  };
}

const c = createCounter();
console.log(c()); // 1
console.log(c()); // 2
