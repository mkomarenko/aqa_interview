
interface User {
  id: number;
  name: string;
}

class UserCache {
  private users = new Map<number, User>();

  save(user: User): void {
    this.users.set(user.id, user);
  }

  get(id: number): User | undefined {
    return this.users.get(id);
  }

  has(id: number): boolean {
    return this.users.has(id);
  }
}

const userCache = new UserCache();
userCache.save({ id: 1, name: "admin"});
userCache.save({ id: 2, name: "guest"});

console.log(userCache.has(1));
console.log(userCache.has(3));
console.log(userCache.get(2));
