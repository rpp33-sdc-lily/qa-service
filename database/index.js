const Pool = require('pg').Pool
const pool = new Pool({
  user: 'chloe',
  host: 'localhost',
  database: 'qatestdb',
  password: 'password',
  port: 5432,
});

module.exports.query = (text, values) => {
  console.log('query:', text, Array.isArray(values))

  return pool.query(text, values)
}
module.exports.close = () =>  {
  return pool.end();
}
