type TestStatus = "passed" | "skipped" | "failed";

interface TestRecord {
  name: string;
  status: TestStatus;
  duration?: number;
}

interface MetricsSummary {
  passed: number;
  failed: number;
  skipped: number;
}

interface MetricsPlugin {
  onRecord(record: TestRecord): void;
}

class ExecutionMetrics {
  private statusCounter: Record<TestStatus, number> = {
    passed: 0,
    skipped: 0,
    failed: 0,
  };
  private passedTestsMap = new Map<string, number>();
  private skippedTestsMap = new Map<string, number>();
  private failedTestsMap = new Map<string, number>();

  private plugins: MetricsPlugin[] = [];

  record(record: TestRecord) {
    this.statusCounter[record.status]++;

    switch (record.status.toLowerCase()) {
      case "passed":
        this.passedTestsMap.set(
          record.name,
          (this.passedTestsMap.get(record.name) ?? 0) + 1,
        );
        break;
      case "skipped":
        this.skippedTestsMap.set(
          record.name,
          (this.skippedTestsMap.get(record.name) ?? 0) + 1,
        );
        break;
      case "failed":
        this.failedTestsMap.set(
          record.name,
          (this.failedTestsMap.get(record.name) ?? 0) + 1,
        );
        break;
      default:
        throw new Error(`Unknown test status: ${record.status}`);
    }

    // extension hook (не ламає core)
    for (const plugin of this.plugins) {
      plugin.onRecord(record);
    }
  }

  getPasses(testName: string) {
    return this.passedTestsMap.get(testName) ?? 0;
  }

  getSkips(testName: string) {
    return this.skippedTestsMap.get(testName) ?? 0;
  }

  getFailures(testName: string): number {
    return this.failedTestsMap.get(testName) ?? 0;
  }

  topFlakyTests(n: number = 3): Map<string, number> {
    const failedTests = Array.from(this.failedTestsMap);
    failedTests.sort((a, b) => b[1] - a[1]);
    return new Map(failedTests.slice(0, n));
  }

  summary(): MetricsSummary {
    return { ...this.statusCounter };
  }

  reset(): void {
    this.statusCounter = {
      passed: 0,
      skipped: 0,
      failed: 0,
    };
    this.passedTestsMap.clear();
    this.skippedTestsMap.clear();
    this.failedTestsMap.clear();
  }

  registerPlugin(plugin: MetricsPlugin): void {
    this.plugins.push(plugin);
  }
}

class DurationPlugin implements MetricsPlugin {
  private durations = new Map<string, number>();

  onRecord(record: TestRecord): void {
    if (record.duration !== undefined) {
      this.durations.set(record.name, record.duration);
    }
  }

  getDuration(testName: string): number | undefined {
    return this.durations.get(testName);
  }
}

const metrics = new ExecutionMetrics();
const durationPlugin = new DurationPlugin();
metrics.registerPlugin(durationPlugin);

metrics.record({ name: "login", status: "failed" });
metrics.record({ name: "login", status: "failed" });
metrics.record({ name: "profile", status: "passed" });
metrics.record({ name: "payment", status: "failed", duration: 2000 });
metrics.record({ name: "payment", status: "passed", duration: 1500 });
metrics.record({ name: "profile", status: "failed", duration: 1000 });

console.log(metrics.getFailures("login"));
console.log(metrics.topFlakyTests());
console.log(metrics.summary());
console.log(durationPlugin.getDuration("profile"));
