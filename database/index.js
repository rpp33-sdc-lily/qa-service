const postgres = require('postgres');
const sql = postgres({...options});

await sql
  select name, age, from users;