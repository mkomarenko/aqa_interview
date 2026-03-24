/*
Generic groupBy<T>()

Що має робити

На вході:

масив об'єктів.

Приклад
[
  { name: "login", status: "passed" },
  { name: "payment", status: "failed" },
  { name: "profile", status: "passed" }
]


На виході:

групування по полю.

Result
passed → [...]
failed → [...]

*/

/*
Детальне пояснення
<T, K extends keyof T>
T

тип об'єкта

K

поле цього об'єкта

Map<T[K], T[]>

ключ = значення поля

значення = масив об'єктів

***
keyof is a TypeScript type operator that extracts the keys (property names) of an object type as a union of string or numeric literal types.  It enables type-safe access to object properties and is commonly used in generics, mapped types, and utility functions. 

Basic Usage:
interface Person { name: string; age: number; }
type PersonKeys = keyof Person; // "name" | "age"

With typeof:
When working with object values, use keyof typeof to infer the keys from the actual object’s shape:
const endpoints = { profile: "/profile", login: "/auth/login" } as const;
type EndpointKeys = keyof typeof endpoints; // "profile" | "login"

In Generics:
Enforces that a key passed to a function is valid for a given object:
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

Use Cases:
- Creating type-safe dynamic property access.
- Building utility types like Pick, Partial, and Record.
- Validating keys in configuration or form systems.
- Iterating over object keys with Object.keys() while avoiding any errors. 
keyof is essential for writing reusable, maintainable, and type-safe TypeScript code. 

***
! (Definite Assignment Assertion) and ?. (Optional Chaining) are distinct TypeScript operators serving different purposes. 

! (Definite Assignment Assertion): This is a compiler assertion used to tell TypeScript, "I know this value is not null or undefined, even though the compiler can't verify it." It's placed after a property or variable name (e.g., obj!.prop).  It suppresses compiler errors about potentially unassigned values but does not change runtime behavior. Using it on a truly null or undefined value will cause a runtime error. 
?. (Optional Chaining): This is a runtime operator used to safely access deeply nested properties or call methods on potentially null or undefined values.  If any part of the chain is null or undefined, the entire expression returns undefined instead of throwing an error. It is used for safe navigation (e.g., obj?.prop?.method()).
*/
function groupBy<T, K extends keyof T>(
  items: T[],
  key: K
): Map<T[K], T[]> {
  const result = new Map<T[K], T[]>();

  for (const item of items) {
    const groupKey = item[key];

    if (!result.has(groupKey)) {
      result.set(groupKey, []);
    }

    result.get(groupKey)!.push(item);
  }

  return result;
}


const tests = [
  { name: "login", status: "passed" },
  { name: "payment", status: "failed" },
  { name: "profile", status: "passed" }
]

const groupedTests = groupBy(tests, "status");

for (let [key, value] of groupedTests) {
    console.log(`${key}: ${JSON.stringify(value)}`)
}
