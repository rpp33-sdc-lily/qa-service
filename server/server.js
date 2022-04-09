const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.status(200).send('hello, FEC');
});

/*must check for page and count params eventually*/
app.get('/qa/questions', (req, res) => {
  console.log('did this run');
  res.status(200).send('hello, I have all your questions!');
});

//GET /qa/questions/:question_id/answers
app.get('qa/questions:question_id/answers', (req, res) => {
  res.status(200).send('hello, answers');
});

// GET qa/answers
// POST /qa/questions/:question_id/answers route
// POST /qa/questions
// PUT /qa/questions/:question_id/helpful
// PUT /qa/questions/:question_id/report
// PUT /qa/answers/:answer_id/helpful
// PUT /qa/answers/:answer_id/report
// var server = app.listen(port, () => {
//   console.log(`Now listening on port ${port} at http://localhost:${port}`);
// });

module.exports = app;