const Pool = require('pg').Pool
const pool = new Pool({
  user: 'chloe',
  host: 'localhost',
  database: 'qatestdb',
  password: 'password',
  port: 5432,
})
module.exports = {
  pool,
}