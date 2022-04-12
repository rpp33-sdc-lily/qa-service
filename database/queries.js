
const query = require('./index.js').query;

const getAnswers = (req, res) => {
  pool.query('SELECT * from answers', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.row);
  })
}

const updateQuestion = (req, res) => {
  pool.query('SELECT * from answers', (error, results) => {
    if (error) {
      console.log('errrr', error)
      throw error
    }
    res.status(200).json(results.row);
  })
}
const updateAnswer = (req, res) => {
  pool.query('SELECT * from answers', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.row);
  })
}
const reportQuestion = (req, res) => {

  let answer_id = req.params.answer_id;
  pool.query('UPDATE answers set reported = false where id = $1', answer_id, (error, results) => {
    if (error) {
      console.log('error ', error);
      throw error
    }
    // res.status(200).json(results.row);
    console.log('resukts ', results);
    answer_id ? res.status(204).send('') : res.status(404).send('malformed query please use format /qa/answers/:answer_id/report');
  })
}
const reportAnswer = (req, res) => {

  let answer_id = parseInt(req.params.answer_id);
  console.log('answer ',answer_id);
  console.log('QUERY', query);
 if (answer_id) {
   //query('string','strin2');

  query('UPDATE answers set reported = true where id = $1', [answer_id])
  .then(results => {
    // console.log('results ', results);
    res.status(204).send('')
   })
   .catch(err => {
     console.log('err---->', err);
     throw err;
     res.status(100).send('');
   });

  //   pool.query('UPDATE answers set reported = true where id = $1', [answer_id], (error, results) => {
  //   if ('error', error) {
  // ;
  //     throw error
  //     res.status(500).send('Error executing query ',error.stack);
  //   }
  //   pool.end().then(() => console.log('pool has ended'));
    // res.status(200).json(results.row);


} else {
  res.status(404).send('malformed query please use format /qa/answers/:answer_id/report');
}
}


module.exports = {
  getAnswers,
  reportAnswer,
  updateAnswer,
  reportQuestion,
  updateQuestion,
}