
const pool = require('./index.js');

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