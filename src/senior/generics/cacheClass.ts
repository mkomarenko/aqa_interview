class Cache<T> {
    private data: T | null = null;

    constructor(data: T) {
        this.data = data;
    }

    public saveData(data: T) {
        this.data = data;
    }

    public retriveData(): T | null {
        return this.data;
    }

    public clearCache() {
        this.data = null
    }

}

type User = {
    name: string,
    age: number
}

const userAlice: User = {
    name: "Alice",
    age: 22
}

const userJohn: User = {
    name: "John",
    age: 25
}

const userCache = new Cache(userAlice)
userCache.saveData(userJohn);

const user: User | null = userCache.retriveData()

console.log(user)