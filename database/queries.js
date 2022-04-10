const Pool = require('pg').Pool
const pool = new Pool({
  user: 'chloe',
  host: 'localhost',
  database: 'qatestdb',
  password: 'password',
  port: 5432,
})


const getAnswers = (req, res) => {
  pool.query('SELECT * from answers', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.row);
  })
}


module.exports = {
  getAnswers
}