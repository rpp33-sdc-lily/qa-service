
import http from 'k6/http';
import { sleep, check } from 'k6';
export const options = {
  vus: 1000,
  duration: '1m',
  ext: {
    loadimpact: {
      name: 'Stress questions',
    },
  },
};
var ids = require('./database/files/product_ids.js');
function generateRandom(min = 0, max = 100) {

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
//  var id= generateRandom(900010, 1000011);// for product_id for use in questions table
 var id_index = generateRandom(0, ids.length-1);
/

  // console.log('id', id)
  const res = http.get(`http://localhost:3000/qa/questions?product_id=${ids[id_index]}`);

  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
