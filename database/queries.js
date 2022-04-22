const query = require('./index.js').query;
const pool = require('./index.js');

const getQuestions = (req, res, callback) => {
  let product_id = req.query.product_id;

  let page = req.query.page ? req.query.page -1 : 0;
  let count =  req.query.count ? req.query.count : 5;
  let offset = page * count;
console.log('santity check: ', product_id, count, page);
  if (product_id) {
    pool.query(`WITH
    question_ids AS (
        SELECT *
        FROM questions
        WHERE product_id = $1
    ), answer_ids as (
      SELECT
      a.id as aid,
      a.question_id,
      a.body,
      a.date_written,
      a.answerer_name,
      a.helpful,
      a.reported
        FROM  question_ids as q
        INNER JOIN answers as a
        ON q.id = a.question_id
    ) SELECT
      q.id as question_id,
      q.body as question_body,
      q.question_date, q.asker_name,
      q.helpful as question_helpfulness,
      q.reported,
      CASE WHEN count(a.id)= 0 THEN array_to_json('{}'::int[]) ELSE json_agg(json_build_object('id',a.id,'body',a.body, 'date', a.date, 'answerer_name', a.answerer_name, 'helpfulness', a.helpfulness,'photos',a.photos)) END as answers
       FROM  question_ids as q
       LEFT JOIN (
         SELECT
           a.question_id,
           a.aid as id,
           a.body as body,
           a.date_written as date,
         a.answerer_name,
           a.helpful as helpfulness,
           CASE WHEN count(p.id)= 0 THEN array_to_json('{}'::int[]) ELSE json_agg(json_build_object('id',p.id,'url',p.url)) END as photos
         FROM answer_ids as a
         LEFT JOIN  (
           SELECT photos.id as id, photos.answer_id, photos.url
           FROM answer_ids
           JOIN photos
           ON photos.answer_id = answer_ids.aid
         ) AS p
         ON p.answer_id = a.aid
         GROUP BY p.answer_id, a.question_id, a.aid,a.body, a.date_written, a.helpful, a.reported, a.answerer_name
       ) AS a
       ON q.id = a.question_id
       GROUP BY q.id, q.body, q.question_date, q.asker_name, q.helpful,q.reported
       LIMIT $2 OFFSET $3 ;`, [product_id, count, offset])
      .then(result => {
        // console.log('results in query ', result.rows);
        callback(null, result.rows);
       // return result.rows;
        // res.status(200).send(res.rows);
      }).catch(err => {
        console.log('err', err);
        throw err;
      })
      // return 'sadder';


      // res.status(200).send('sad')

  } else {
    res.status(404).send('Missing query param product_id  please use format ?product_id=product_id');
  }


}

const getAnswers = (req, res,callback) => {
  let question_id = req.params.question_id;
  let page = req.query.page ? req.query.page -1 : 0;
  let count =  req.query.count ? req.query.count : 5;
  let offset = page * count;
  // console.log('any', question_id)
  if (question_id) {
    pool.query(`WITH
    answer_ids as (
    SELECT
          *
    FROM  answers as a
    WHERE a.question_id = $1
    )
       SELECT
         a.question_id,
         a.id as answer_id,
         a.body as body,
         a.answer_date as date,
         a.answerer_name,
         a.helpful as helpfulness,
         CASE WHEN count(p.id)= 0 THEN array_to_json('{}'::int[]) ELSE json_agg(json_build_object('id',p.id,'url',p.url)) END as photos
       FROM answer_ids as a
       LEFT JOIN (
         SELECT
                   photos.id,
                   photos.answer_id ,
                   photos.url as url
         FROM answer_ids
         JOIN photos
         ON photos.answer_id = answer_ids.id
       ) AS p
       ON p.answer_id = a.id
       GROUP BY p.answer_id, a.question_id, a.id, a.body, a.answer_date, a.helpful, a.reported, a.answerer_name
       LIMIT $2 OFFSET $3;
  `, [question_id, count, offset])
      .then(result => {

        callback(null, result.rows);
       // return result.rows;
        // res.status(200).send(res.rows);
      }).catch(err => {
        console.log('err', err);
        throw err;
      })

  } else {
    res.status(404).send('Missing query param question_id. please use format questions/question_id/answers');
  }

}
const insertQuestion = (req, res, callback) => {
  let product_id = req.query.product_id;
  let body = req.query.body;
  let name = req.query.name;
  let email = req.query.email;
  let page = req.query.page ? req.query.page : 1;
  let count =  req.query.count ? req.query.count : 5;

  if (product_id) {
    pool.query(`INSERT INTO questions
    (product_id, body, date_written, asker_name, asker_email, reported, helpful, new_id, question_date)
    SELECT $1, $2, (EXTRACT(EPOCH FROM Now())::numeric * 1000)::bigint, $3, $4, false,0, CAST(LPAD(TO_HEX(max(id)+1), 32, '0') AS UUID), NOW()
    from questions;`, [product_id, body, name, email])

      .then(result => {
        // console.log('results in query ', result.rows);
        callback(null, result.rows);
       // return result.rows;
        // res.status(200).send(res.rows);
      }).catch(err => {
        console.log('err', err);
        throw err;
      })

  } else {
    res.status(404).send('Missing query param product_id  please use format ?product_id=product_id');
  }


}
const insertAnswer = (req, res,callback) => {
  let question_id = req.params.question_id;
  let body = req.query.body;
  let name = req.query.name;
  let email = req.query.email;
  let photos = req.query.photos;

  if (question_id) {
    pool.query(` INSERT INTO answers
    (question_id, body, date_written, answerer_name, answerer_email, reported, helpful, new_id, answer_date)
    SELECT $1, $2, (EXTRACT(EPOCH FROM Now())::numeric * 1000)::bigint, $3,
    $4, false,0, CAST(LPAD(TO_HEX(max(id)+1), 32, '0') AS UUID), NOW()
    from questions;
  `, [question_id, body, name, email])
      .then(result => {

        callback(null, result.rows);
       // return result.rows;
        // res.status(200).send(res.rows);
      }).catch(err => {
        console.log('err', err);
        throw err;
      })

  } else {
    res.status(404).send('Missing query param question_id. please use format questions/question_id/answers');
  }

}

const updateQuestion = (req, res) => {
  pool.query('SELECT * from answers', (error, results) => {
    if (error) {
      console.log('errrr', error)
      throw error
    }
    res.status(200).json(results.row);
  })
}
const updateAnswer = (req, res) => {
  pool.query('SELECT * from answers', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.row);
  })
}
const reportQuestion = (req, res) => {

  let answer_id = req.params.answer_id;
  pool.query('UPDATE answers set reported = false where id = $1', [answer_id], (error, results) => {
    if (error) {
      console.log('error ', error);
      throw error
    }
    // res.status(200).json(results.row);
    console.log('report ', results);
    answer_id ? res.status(204).send('') : res.status(404).send('malformed query please use format /qa/answers/:answer_id/report');
  })
}
const reportAnswer = (req, res) => {

  let answer_id = parseInt(req.params.answer_id);
 if (answer_id) {
  query('UPDATE answers set reported = true where id = $1', [answer_id])
  .then(results => {
    if (results.rowCount === 0) {
      res.status(404).send('id does not exist in table');
    } else {
    res.status(204).send('');
    }
   })
   .catch(err => {
     console.log('err---->', err);
     throw err;
     res.status(100).send('');
   });

} else {
  res.status(400).send('malformed query please use format /qa/answers/:answer_id/report');
}
}
const selectKeysForTable = (req, res) => {

  var table = req.query.table
  var id = req.query.id;
  console.log('id', id, ' table', table);
  query(`select array_agg(question_id) as ids from
  (SELECT DISTINCT question_id FROM answers ORDER BY question_id DESC
      LIMIT (SELECT (count(*) / 50) AS lastten FROM answers)) as question_id`)
        .then(results => {
          console.log('results:', results);
          res.status(200).send(results.rows);
        })
        .catch(err => {
          console.log('err',err);
          res.status(500).send(err)
        })
}

module.exports = {
  getQuestions,
  getAnswers,
  insertQuestion,
  insertAnswer,
  reportAnswer,
  updateAnswer,
  reportQuestion,
  updateQuestion,
  selectKeysForTable
}