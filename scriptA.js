
import http from 'k6/http';
import { sleep, check } from 'k6';
export const options = {
  vus: 2000,
  duration: '1m',
  ext: {
    loadimpact: {
      name: 'Stress Answers',
    },
  },
};
var ids = require('./database/files/question_ids2.js');

function generateRandom(min = 0, max = 100) {

  // find diff
  let difference = max - min;
  // generate random number
  let rand = Math.random();
  // multiply with difference
  rand = Math.floor( rand * difference);
  // add with min value
  rand = rand + min;
  return rand;
}
//	3518969

export default function () {
//  var id= generateRandom(3167073	, 3518969);// for product_id for use in questions table
  var id= generateRandom(0, ids.length-1); // for question_id for use in Answers table

 
  const res = http.get(`http://localhost:3000/qa/questions/${ids[id]}/answers`);

  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}

