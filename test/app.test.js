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
test('GET /qa/questions', async() => {
  await supertest(server).get('/qa/questions')
  .expect(200)
  .then((response) => {
    expect(response.text).toEqual('hello, I have all your questions!');
  })
});
//GET qa/questions route
test('GET /qa/answers', async() => {
  await supertest(server).get('/qa/questions?product_id=545332')
  .expect(200)
  .then((response) => {
    expect(response.text).toEqual('hello, answers');
  })
});


});


// Parameter Type Description
// body text Text of question being asked
// name text Username for question asker
// email text Email address for question asker
// product_id integer Required ID of the Product for which the question is posted
// Response

// Status: 201 CREATED