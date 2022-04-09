const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.status(200).send('hello, FEC');

});
//GET /qa/questions/:question_id/answers
// GET qa/questions/
app.get('/qa/questions/', (req, res) => {
  let product_id = req.query.product_id;
  let page = req.query.page ? req.query.page : 1;
  let count =  req.query.count ? req.query.count : 5;
  console.log('product_id = ', product_id);
  product_id ?  res.status(200).send('Here are your questions') : res.status(404).send('Missing query param product_id  please use format ?product_id=product_id');
});

/*must check for page and count params eventually*/
app.get('/qa/questions/:product_id/answers/', async function (req, res){
  let product_id = req.params.id;
  console.log('GET QUESTIONS');
  console.log('GET ID', product_id);

  res.status(200).send('req.params');
});




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