/*
Detect duplicate users in test data:
[
  { id: 1 },
  { id: 2 },
  { id: 1 }
]
*/


/*
Senior solution
Big O: O(n)
*/
const users = [
  { id: 1 },
  { id: 2 },
  { id: 1 },
  { id: 3 },
  { id: 4 },
  { id: 3 }
]

const ids = new Set<number>();

for (const user of users) {
  if (ids.has(user.id)) {
    console.log(`${user.id} - duplicate`);
  }

  ids.add(user.id);
}
