class FlakyTracker {
    private failures = new Map<string, number>();

    addFailure (testName: string) {
        this.failures.set(testName, ((this.failures.get(testName) ?? 0) + 1));
    }

    getFailureCount (testName: string): number {
        return this.failures.get(testName) ?? 0;
    }

    topFlakyTests (topN: number) {
        let failuresArr:Array<[string, number]> = Array.from(this.failures);

        failuresArr.sort((a, b) => b[1] - a[1]);

        return failuresArr.slice(0, topN);
    }
}

const flakyTracker = new FlakyTracker();

flakyTracker.addFailure("login");
flakyTracker.addFailure("user profile");
flakyTracker.addFailure("login");
flakyTracker.addFailure("shopping cart");

console.log(flakyTracker.getFailureCount("login"));
console.log(flakyTracker.getFailureCount("user profile"));
console.log(flakyTracker.topFlakyTests(3)[0]);