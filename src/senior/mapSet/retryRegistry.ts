let retriedTests = ["login", "shopping cart", "user profile"]

class RetryRegistry {
  private retriedTests = new Set<string>();

  mark(testName: string): void {
    this.retriedTests.add(testName);
  }

  hasRetried(testName: string): boolean {
    return this.retriedTests.has(testName);
  }

  clear(): void {
    this.retriedTests.clear();
  }
}

const retryRegistry = new RetryRegistry();

const testName = retriedTests[0];

if (!retryRegistry.hasRetried(testName)) {
  retryRegistry.mark(testName);
}

console.log(retryRegistry.hasRetried(testName));
console.log(retryRegistry.hasRetried(retriedTests[1]));



