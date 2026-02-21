const myPromise = new Promise((resolve, reject) => {
  // Simulate an asynchronous operation (e.g., an API call)
  setTimeout(() => {
    const success = true; // Placeholder for actual operation outcome
    if (success) {
      resolve("Operation successful!"); // Call resolve on success
    } else {
      reject("Operation failed!"); // Call reject on failure
    }
  }, 1000);
});

myPromise
  .then((value) => {
    console.log(value); // Logs "Operation successful!"
  })
  .catch((error) => {
    console.error(error); // Logs "Operation failed!" if rejected
  })
  .finally(() => {
    console.log("Promise operation finished."); // Runs in both cases
  });
