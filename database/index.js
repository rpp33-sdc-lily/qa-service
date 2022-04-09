const postgres = require('postgres');
const sql = postgres({...options});

await swl
  select name, age, from users;