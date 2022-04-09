// const server = require('./server/server');
const supertest = require('supertest');
// const app = require('./server/index.js');

describe('test server API', function() {

  var server;

  beforeEach(function(){
    server = require('../server/server.js');
  });
  afterEach(function () {
    // server.close();
  });


  test('GET /posts', async() => {
    await supertest(server).get('/')
    .expect(200)
    .then((response) => {
      expect(response.text).toEqual('hello, FEC');
    })
  });
// // //POST qa/questions route
//   test('POST /qa/questions route', async() => {
//     await supertest(server).post('/qa/questions')
//     .expect(200)
//     .then((response) => {
//       expect(response.text).toEqual('hello, FEC');
//     })
//   });


//GET qa/questions route
describe('test qa/questions route', function() {
  test('GET /qa/questions without the required param', async() => {
    await supertest(server).get('/qa/questions')
    .expect(404)
    .then((response) => {
      expect(response.text).toEqual('Missing query param product_id  please use format ?product_id=product_id');
    });
  });
  test('GET /qa/questions?product_id=545332 with required param', async() => {
    await supertest(server).get('/qa/questions?product_id=545332')
    .expect(200)
    .then((response) => {
      expect(response.text).toEqual('Here are your questions');
    });
  });
});
// should also test with page and count later

describe('test GET answers route route', function() {

   //SAD
    ///qa/questions/:64626/answers/
    test('GET answers without required param', async() => {
    await supertest(server).get('/qa/questions/answers/')
    .expect(404)
    .then((response) => {
      expect(response.text).toEqual('malformed query please use format /qa/questions/:question_id/answers/');
    });
  });
  //HAPPY
  test('GET answers with required param', async() => {
    await supertest(server).get('/qa/questions/:64626/answers/')
    .expect(200)
    .then((response) => {
      expect(response.text).toEqual('query.params');
    });
  });




  });

// PUT /qa/questions/:question_id/helpful
// PUT /qa/questions/:question_id/report

// PUT /qa/answers/:answer_id/helpful
// PUT /qa/answers/:answer_id/report
describe('test update answers as helpful or report route', function() {


   //SAD
   //PUT /qa/questions/:question_id/helpful
   test('Sad Path: Put question answer helpfulness without query param', async() => {
    await supertest(server).put('/qa/answers/helpful')
    .expect(404)
    .then((response) => {
      expect(response.text).toEqual('malformed query please use format /qa/answers/:answer_id/helpful');
    });
  });
  //HAPPY
  //PUT /qa/questions/:question_id/helpful
  test('Happy Path: put update question helpfulness', async() => {
    await supertest(server).put('/qa/questions/64626/helpful')
    .expect(200)
    .then((response) => {
      expect(response.text).toEqual('question 64626 helpfulness updated');
    });
  });

  //SAD
   ///qa/questions/:64626/answers/
   test('Sad Path: Put update answer helpfulness without query param', async() => {
   await supertest(server).put('/qa/answers/helpful')
   .expect(404)
   .then((response) => {
     expect(response.text).toEqual('malformed query please use format /qa/answers/:answer_id/helpful');
   });
 });
 //HAPPY
 test('Happy Path: put update answer helpfulness', async() => {
   await supertest(server).put('/qa/answers/745/helpful')
   .expect(200)
   .then((response) => {
     expect(response.text).toEqual('answer 745 helpfulness updated');
   });
 });






 });



});

// Parameter Type Description
// body text Text of question being asked
// name text Username for question asker
// email text Email address for question asker
// product_id integer Required ID of the Product for which the question is posted
// Response

// Status: 201 CREATED