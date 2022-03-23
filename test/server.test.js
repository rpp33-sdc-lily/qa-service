// const server = require('./server/server');
const supertest = require('supertest');
// const app = require('./server/index.js');

describe('this test', function() {

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
});
