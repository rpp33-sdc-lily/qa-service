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
// app.get('/qa/questions/:product_id?/answers/', async function (req, res){
//   let product_id = req.params.product_id;
//   // console.log('GET ID', product_id);
//   // console.log(req.query)
//   // console.log(req.params)
//   product_id ? res.status(200).send('req.params') : res.status(404).send('malformed query please use format /qa/questions/:product_id/answers/');
// });

app.get('/qa/questions/:question_id?/answers/', async function (req, res){
  let question_id = req.params.question_id;
  // console.log('GET ID', question_id);
  // console.log(req.query)
  // console.log(req.params)
  question_id ? res.status(200).send(`query.params`) : res.status(404).send('malformed query please use format /qa/questions/:question_id/answers/');
});
   //POST /qa/questions/:question_id/answers
app.post('/qa/questions/:question_id?/answers/', async function (req, res){
let question_id = req.params.question_id;
// console.log('GET ID', question_id);
// console.log(req.query)
// console.log(req.params)//change to NO CONTENT EVENTUALLY
question_id ? res.status(201).send('') : res.status(404).send('malformed query please use format /qa/questions/question_id/answers');
});

app.put('/qa/questions/:question_id?/helpful/', async function (req, res){
  let question_id = req.params.question_id;
  // console.log('GET ID', question_id);
  // console.log(req.query)
  // console.log(req.params)//change to NO CONTENT EVENTUALLY
  question_id ? res.status(204).send('') : res.status(404).send('malformed query please use format /qa/questions/:question_id/answers/');
});
app.put('/qa/questions/:question_id?/report', async function (req, res){
  let question_id = req.params.question_id;
  // console.log('report question', question_id);
  // console.log(req.query)
  // console.log(req.params)//change to NO CONTENT EVENTUALLY
  question_id ? res.status(204).send(`question ${question_id} reported`) : res.status(404).send('malformed query please use format /qa/questions/:question_id/report');
});

app.put('/qa/answers/:answer_id?/helpful', async function (req, res){
  let answer_id = req.params.answer_id;
  // console.log('GET ID', answer_id);
  // console.log(req.query)
  // console.log(req.params)//change to NO CONTENT EVENTUALLY
  answer_id ? res.status(204).send(`answer ${answer_id} helpfulness updated`) : res.status(404).send('malformed query please use format /qa/answers/:answer_id/helpful');
});
app.put('/qa/answers/:answer_id?/report', async function (req, res){
  let answer_id = req.params.answer_id;
  // console.log('report answer', answer_id);
  // console.log(req.query)
  // console.log(req.params)//change to NO CONTENT EVENTUALLY
  answer_id ? res.status(204).send('') : res.status(404).send('malformed query please use format /qa/answers/:answer_id/report');
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