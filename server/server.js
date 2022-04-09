const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.status(200).send('hello, FEC');

});
//GET /qa/questions/:question_id/answers
// GET qa/questions/
app.get('/qa/questions/', (req, res) => {
  console.log('GET ANSWERS', req);

  let product_id = req.query.product_id;
  let page = req.query.page ? req.query.page : 1;
  let count =  req.query.count ? req.query.count : 5;

  product_id ?  res.status(200).send('hello, answers') :  res.status(200).send('hello, I have all your questions!');
});
/*must check for page and count params eventually*/
// app.get('/qa/questions/', (req, res) => {
//   console.log('GET QUESTIONS', req);
//   res.status(200).send('hello, I have all your questions!');
// });




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