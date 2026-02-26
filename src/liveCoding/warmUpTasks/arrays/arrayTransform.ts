// Given an array of users, return emails of active users in lowercase. Complete it in 2 lines of code

const users = [
  { email: "A@Mail.com", active: true },
  { email: "B@Mail.com", active: false },
  { email: "C@Mail.com", active: true }
];

const result = users.filter((u) => u.active === true).map((u) => u.email.toLowerCase());
console.log(result);
