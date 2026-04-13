interface RetryStrategy {
  shouldRetry(attempt: number, error: Error): boolean;
}

class NoRetryStrategy implements RetryStrategy {
  shouldRetry(): boolean {
    return false;
  }
}

class FixedRetryStrategy implements RetryStrategy {
  constructor(private maxRetries: number) {}

  shouldRetry(attempt: number): boolean {
    return attempt < this.maxRetries;
  }
}

class NetworkRetryStrategy implements RetryStrategy {
  shouldRetry(attempt: number, error: Error): boolean {
    if (attempt >= 3) return false;

    return error.message.includes("network");
  }
}

class RetryStrategyFactory {
  static create(env: string): RetryStrategy {
    switch (env) {
      case "prod":
        return new NoRetryStrategy();

      case "staging":
        return new FixedRetryStrategy(2);

      case "dev":
        return new FixedRetryStrategy(5);

      default:
        return new NoRetryStrategy();
    }
  }
}

interface TimeoutStrategy {
  getTimeout(attempt: number): number;
}

class FixedTimeoutStrategy implements TimeoutStrategy {
  constructor(private readonly timeout: number) {}
  getTimeout(): number {
    return this.timeout;
  }
}

class ExponentialBackoffStrategy implements TimeoutStrategy {
  constructor(
    private readonly baseDelay: number = 1000,
    private readonly factor: number = 2,
    private readonly maxDelay: number = 30000,
    private readonly jitter: boolean = true,
  ) {}

  getTimeout(attempt: number): number {
    let delay = this.baseDelay * Math.pow(this.factor, attempt);

    // cap to max
    delay = Math.min(delay, this.maxDelay);

    // add jitter to avoid thundering herd problem
    if (this.jitter) {
      delay = this.applyJitter(delay);
    }

    return delay;
  }

  private applyJitter(delay: number): number {
    const randomFactor = 0.5 + Math.random(); // 0.5 - 1.5
    return Math.floor(delay * randomFactor);
  }
}

type TimeoutType = "fixed" | "exponential";

class TimeoutStrategyFactory {
  static create(type: TimeoutType): TimeoutStrategy {
    switch (type) {
      case "fixed":
        return new FixedTimeoutStrategy(5000);

      case "exponential":
        return new ExponentialBackoffStrategy(2000);

      default:
        throw new Error("Unsupported timeout strategy");
    }
  }
}

class TestExecutor {
  constructor(
    private readonly retryStrategy: RetryStrategy,
    private readonly timeoutStrategy: TimeoutStrategy,
  ) {}

  async run(fn: () => Promise<void>) {
    let attempt = 0;

    while (true) {
      try {
        await fn();
        return;
      } catch (error) {
        if (!this.retryStrategy.shouldRetry(attempt, error as Error)) {
          throw error;
        }

        const timeout = this.timeoutStrategy.getTimeout(attempt);

        await this.delay(timeout);

        attempt++;
      }
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

const retryStrategy = RetryStrategyFactory.create("staging");
const timeoutStrategy = TimeoutStrategyFactory.create("exponential");

const executor = new TestExecutor(retryStrategy, timeoutStrategy);

async function main() {
  function failNTimes(n: number) {
    let attempt = 0;

    return function () {
      if (attempt <= n) {
        attempt += 1;
        throw new Error("Error during executing test");
      }

      console.log("Test passed");
    };
  }

  const f = failNTimes(1);
  executor.run(async () => f());
}

main();
