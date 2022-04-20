
import http from 'k6/http';
import { sleep, check } from 'k6';
export const options = {
  vus: 2100,
  duration: '1m',
  ext: {
    loadimpact: {
      name: 'Stress questions',
    },
  },
};

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
  //980011
 var id= generateRandom(900010, 1000011);// for product_id for use in questions table
//  var id= generateRandom(980011, 1000011);// for product_id for use in questions table


  // console.log('id', id)
  const res = http.get(`http://localhost:3000/qa/questions?product_id=${id}`);


  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}

// select array_agg(question_id) from
// (SELECT DISTINCT question_id FROM answers ORDER BY question_id DESC
//     LIMIT (SELECT (count(*) / 10) AS lastten FROM answers)) as question_id