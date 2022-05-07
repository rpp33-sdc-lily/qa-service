// require('newrelic');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('../database/queries.js');
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
  extended: true,
  })
);
app.get('/', (req, res) => {
  res.status(200).json({'info': 'Node.js, Express, and Postgres API'});
});
var loaderioKey = 'loaderio-4c9786b81b83750c9e376f85ba3838d8';
app.get(`/${loaderioKey}/`, (req, res) => {
  console.log(`sent ${loaderioKey}  back`);
  res.status(200).send(loaderioKey);
})

var product_ids =require('../database/files/questionsPayload.js');
app.get('/payload/product_id', (req, res) => {
  console.log('send product_ids')
  res.status(200).send(product_ids);
})
//GET /qa/questions/:question_id/answers

app.get('/info/', db.selectKeysForTable);

// app.get('/qa/questions/', ((req, res) => {

//   db.getQuestions(req,res,(err,response)=>{
//     if(err) {
//       console.log('err in questions', err);
//       res.status(500).send(err);
//     }
//       res.status(200).json({'product_id':req.query.product_id,'results':response});
//   });

// }));

app.get('/qa/questions/', db.getQuestions);

   //POST /qa/questions/:question_id/answers
app.post('/qa/questions/', async function (req, res){
  let product_id = req.query.product_id;
  let body = req.query.body;
  let name = req.query.name;
  let email = req.query.email;

  if ( body === undefined || name === undefined || email === undefined) {
    res.status(400).send('malformed query. query requires, body, name and email');
  } else {
    db.insertQuestion(req, res, (err, response) => {
      if(err) {
        res.status(500).send('server error');
      }
      // console.log('response sent from server: ',response);
      res.status(201).send('');
    });
  }
});

app.get('/qa/questions/:question_id?/answers/', async function (req, res){

  let page = req.query.page ? req.query.page : 1;
  let count =  req.query.count ? req.query.count : 5;
  db.getAnswers(req,res,(err,response)=>{
    if(err) {
      console.log(err, err);
      res.status(500).send('internal error')
    } else {
        res.status(200).json({'question_id': req.params.question_id, 'results':response});

    }
  })
});
   //POST /qa/questions/:question_id/answers
app.post('/qa/questions/:question_id?/answers/', async function (req, res){
  let question_id = req.params.question_id;
  let body = req.query.body;
  let name = req.query.name;
  let email = req.query.email;
  let photos = req.query.photos;

  if ( body === undefined || name === undefined || email === undefined) {
    res.status(404).send('malformed query. query requires, body, name and email');
  } else {
    db.insertAnswer(req, res, (err, response) => {
      if(err) {
        res.status(500).send('server error');
      }
      // console.log('response sent from server: ',response);
      res.status(201).send('');
    });
  }

});

app.put('/qa/questions/:question_id?/helpful/', async function (req, res){
  let question_id = req.params.question_id;
  question_id ? res.status(204).send('') : res.status(404).send('malformed query please use format /qa/questions/:question_id/answers/');
});

app.put('/qa/questions/:question_id?/report', async function (req, res){
  let question_id = req.params.question_id;
  question_id ? res.status(204).send('') : res.status(404).send('malformed query please use format /qa/questions/:question_id/report');
});

app.put('/qa/answers/:answer_id?/helpful', async function (req, res){
  let answer_id = req.params.answer_id;

  answer_id ? res.status(204).send('') : res.status(404).send('malformed query please use format /qa/answers/:answer_id/helpful');
});

app.put('/qa/answers/:answer_id?/report', db.reportAnswer);





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