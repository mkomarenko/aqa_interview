/*
Problem: Given users with duplicate id, keep the latest occurrence.

Example

Input: [{id:1,name:"A"},{id:1,name:"A2"},{id:2,name:"B"}]

Output: [{id:1,name:"A2"},{id:2,name:"B"}]
*/

const users = [{id:1,name:"A"},{id:1,name:"A2"},{id:2,name:"B"}]

type User = { id: number; name: string };

function dedupeByIdKeepLast(users: User[]): User[] {
  const byId = new Map<number, User>();

  for (const u of users) {
    byId.set(u.id, u); // overwrites older entry with same id
  }

  return [...byId.values()];
}
/*
Explanation

Map.set() overwrites existing value for that key, which is exactly what we want.

Complexity

Time: O(n)

Space: O(k)
*/

const deduplicated = dedupeByIdKeepLast(users);

for (let el of deduplicated) {
    console.log(el)
} 