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


describe('test update answers as helpful', function() {

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
    .expect(204)
    .then((response) => {
      expect(response.text).toEqual('');
    });
  });

  //SAD
  // PUT /qa/answers/:answer_id/helpful
  test('Sad Path: Put update answer helpfulness without query param', async() => {
   await supertest(server).put('/qa/answers/helpful')
   .expect(404)
   .then((response) => {
     expect(response.text).toEqual('malformed query please use format /qa/answers/:answer_id/helpful');
   });
 });
 //HAPPY
 //PUT /qa/answers/:answer_id/helpful
 test('Happy Path: put update answer helpfulness', async() => {
   await supertest(server).put('/qa/answers/745/helpful')
   .expect(204)
   .then((response) => {
     expect(response.text).toEqual('');
   });
 });
});
 describe('test report question or answer', function() {

//SAD
  // PUT /qa/answers/:answer_id/report
  test('Sad Path: Put  report question without query param', async() => {
    await supertest(server).put('/qa/questions/report')
    .expect(404)
    .then((response) => {
      expect(response.text).toEqual('malformed query please use format /qa/questions/:question_id/report');
    });
  });
  //HAPPY
  //PUT /qa/answers/:answer_id/helpful
  test('Happy Path: report question', async() => {
    await supertest(server).put('/qa/questions/64626/report')
    .expect(204)
    .then((response) => {
      expect(response.text).toEqual('');
    });
  });


 //SAD
  // PUT /qa/answers/:answer_id/report
  test('Sad Path: Put update report answer without query param', async() => {
    await supertest(server).put('/qa/answers/report')
    .expect(404)
    .then((response) => {
      expect(response.text).toEqual('malformed query please use format /qa/answers/:answer_id/report');
    });
  });
  //HAPPY
  //PUT /qa/answers/:answer_id/helpful
  test('Happy Path: report answer', async() => {
    await supertest(server).put('/qa/answers/745/report')
    .expect(204)
    .then((response) => {
      expect(response.text).toEqual('');
    });
  });


 });
 describe('insert a new answer', function() {
   //SAD
   //POST /qa/questions/:question_id/answers
  test('Sad Path: insert a new answer', async() => {
    await supertest(server).post('/qa/questions/answers')
    .expect(404)
    .then((response) => {
      expect(response.text).toEqual('malformed query. query requires, body, name and email');
    });
  });
  //HAPPY
  //POST /qa/questions/:question_id/answers
  test('Happy Path: insert an answer', async() => {
    await supertest(server).post('/qa/questions/64626/answers?name=arie&email=babynews@gmail.com&body=SunnySkies')
    .expect(201)
    .then((response) => {
      expect(response.text).toEqual('');
    });
  });

});
describe('insert a new question', function() {
  //SAD
  //POST /qa/questions/
 test('Sad Path: insert a new Question', async() => {
   await supertest(server).post('/qa/questions/')
   .expect(404)
   .then((response) => {
     expect(response.text).toEqual('malformed query. query requires, body, name and email');
   });
 });
 //HAPPY
 //POST /qa/questions/:question_id/answers
 test('Happy Path: insert an answer', async() => {
   await supertest(server).post('/qa/questions/?product_id=64626&name=arie&email=babynews@gmail.com&body=ThunderStorm')
   .expect(201)
   .then((response) => {
     expect(response.text).toEqual('');
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