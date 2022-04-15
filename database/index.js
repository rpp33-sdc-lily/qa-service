const Pool = require('pg').Pool

const pool = new Pool({
  user: 'chloe',
  host: 'localhost',
  database: process.env.MODE = 'testing' ? 'qatestdb' : 'qa',
  password: 'password',
  port: 5432,
});

module.exports.query = (text, values) => {
  // console.log(text, 'values is an array:', Array.isArray(values))

  return pool.query(text, values)
}
module.exports.close = () =>  {
  return pool.end();
}
