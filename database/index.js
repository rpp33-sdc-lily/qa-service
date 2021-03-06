const Pool = require('pg').Pool
console.log('in ', process.env.NODE_ENV, ' mode');
var db = process.env.NODE_ENV === 'production' ? 'qa' : 'qatestdb';
var db_password = require('./db_config.js').DB_PASSWORD;
console.log('db selected: ', db);
var pool;
if (db === 'qa') {
  pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: db,
    password: db_password,
    port: 5432

  });
} else {
    pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: db,
    password: db_password,
    port: 5432,
    min: 1,
    max:1
  });
}

module.exports.query = (text, values) => {
  return pool.query(text, values)
}
module.exports.close = () =>  {
  return pool.end();
}
