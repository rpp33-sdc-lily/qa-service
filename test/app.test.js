// const server = require('./server/server');
const supertest = require('supertest');
var server = require('../server/server.js');
describe('test server API', function() {
  // var server;
  const pool =  require('../database/index.js')

  beforeEach(function(){

    return pool.query('START TRANSACTION');

  });
  afterEach(function () {
    // server.close();
    return pool.query('ROLLBACK');
  });
  beforeAll(() => {

  })
  afterAll(() => {
    pool.close();
    console.log('closed pool connections');
  })

//GET qa/questions route
describe('test qa/questions route', function() {
  test('Sad Path: GET /qa/questions without the required param', async() => {
    await supertest(server).get('/qa/questions')
    .expect(404)
    .then((response) => {
      expect(response.text).toEqual('Missing query param product_id  please use format ?product_id=product_id');
    });
  });
  test('Happy path: GET /qa/questions?product_id=10 with required param', async() => {
    await supertest(server).get('/qa/questions?product_id=10')
    .expect(200)
    .then((response) => {
      console.log('9', JSON.parse(response.text).results.length);
      expect(JSON.parse(response.text).results.length).toEqual(3);
      expect(JSON.parse(response.text).results[0].question_body).toEqual('HI GUYS?');
      expect(JSON.parse(response.text).results[1].question_body).toEqual('Where is this product made?');
      expect(JSON.parse(response.text).results[2].question_body).toEqual('What fabric is the top made of?');
      expect(JSON.parse(response.text).results[0].answers.length).toEqual(1);
    })
  });
});
// should also test with page and count later

describe('test GET answers route', function() {

   //SAD
    ///qa/questions/:64626/answers/
    test('SAD Path: GET answers without required param', async() => {
    await supertest(server).get('/qa/questions/answers/')
    .expect(404)
    .then((response) => {
      expect(response.text).toEqual('Missing query param question_id. please use format questions/question_id/answers');
    });
  });
  //HAPPY
  test('Sad Path: GET answers with invalid ID', async() => {
    await supertest(server).get('/qa/questions/3/answers/')
    .expect(404)
    .then((response) => {
      // console.log('answers =  ', JSON.parse(response.text))
      console.log('answer =',response.text)
      expect(response.text).toEqual('id does not exist in table');
    });
  });

  test('Happy Path: GET answers with required param', async() => {
    await supertest(server).get('/qa/questions/1/answers/')
    .expect(200)
    .then((response) => {
      // console.log('answers =  ', JSON.parse(response.text))
      console.log('answer =', JSON.parse(response.text))

      expect(JSON.parse(response.text).results.length).toEqual(5);
      expect(JSON.parse(response.text).results[0].body).toEqual("Something pretty soft but I can't be sure");
      expect(JSON.parse(response.text).results[1].body).toEqual('Its the best! Seriously magic fabric');
      expect(JSON.parse(response.text).results[2].body).toEqual("DONT BUY IT! It's bad for the environment");
      expect(JSON.parse(response.text).results[0].photos.length).toEqual(3);
      expect(JSON.parse(response.text).results[1].photos.length).toEqual(0);
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
   await supertest(server).put('/qa/answers/699/helpful')
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
    .expect(400)
    .then((response) => {
      expect(response.text).toEqual('malformed query please use format /qa/answers/:answer_id/report');
    });
  });
  test('Sad Path:id not in table', async() => {
    await supertest(server).put('/qa/answers/700/report')
    .expect(404)
    .then((response) => {
      expect(response.text).toEqual('id does not exist in table');
    });
  });
  //HAPPY PUT /qa/answers/:answer_id/report
  test('Happy Path: report answer', async() => {
    await supertest(server).put('/qa/answers/699/report')
    .expect(204)
    .then((response) => {
      expect(response.text).toEqual('');
    })
    .then( () => { //verify that the results in the table is correct
      return pool.query('SELECT * FROM answers WHERE id = $1', [699]);
    })
    .then(res => {
     expect(res.rows[0].id).toEqual(699);
     expect(res.rows[0].reported).toEqual(true);
    })
    .then(()=> { // set the results back to the original state
      return pool.query('UPDATE answers set reported = false WHERE id = $1', [699])
        .then(response => {
          // console.log('update ',response);
        })
        .catch(err => { console.log('error updated report', err);})
      })
    // .catch(err => { console.log('1.5', err);})
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
    await supertest(server).post('/qa/questions/109/answers?name=arie&email=babynews@gmail.com&body=SunnySkies')
    .expect(201)
    .then((response) => {
      expect(response.text).toEqual('');
    })
    .then(()=> {
      return pool.query('SELECT * FROM answers WHERE question_id = $1',[109])
      .then(response => {
       expect(response.rows.length).toEqual(5);
      })
     })

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
 test('Happy Path: insert a question with valid params', async() => {
   await supertest(server).post('/qa/questions/?product_id=111&name=arie&email=babynews@gmail.com&body=ThunderStorm')
   .expect(201)
   .then((response) => {
     expect(response.text).toEqual('');
   }).then(()=> {
    return pool.query('SELECT * FROM questions WHERE product_id = $1',[111])
    .then(response => {
     expect(response.rows.length).toEqual(1);
    })
   })

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