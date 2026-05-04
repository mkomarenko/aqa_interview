class Cache<T> {
  private storage = new Map<string, T>();

  set(key: string, value: T): void {
    this.storage.set(key, value);
  }

  get(key: string): T | undefined {
    return this.storage.get(key);
  }

  has(key: string): boolean {
    return this.storage.has(key);
  }

  clear(): void {
    this.storage.clear();
  }
}

type User = {
  name: string;
  age: number;
};

const userAlice: User = {
  name: "Alice",
  age: 22,
};

const userJohn: User = {
  name: "John",
  age: 25,
};

const userCache = new Cache<User>();
userCache.set("alice", userAlice);
userCache.set("john", userJohn);

const user = userCache.get("alice");

console.log(user);
