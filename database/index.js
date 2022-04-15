const Pool = require('pg').Pool
console.log('in ', process.env.NODE_ENV, ' mode');
var db = process.env.NODE_ENV === 'production' ? 'qa' : 'qatestdb';
console.log('db selected: ', db);

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: db,
  password: 'telemann',
  port: 5432,
});

module.exports.query = (text, values) => {
  // console.log(text, 'values is an array:', Array.isArray(values))

  return pool.query(text, values)
}
module.exports.close = () =>  {
  return pool.end();
}
