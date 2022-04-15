const query = require('./index.js').query;
const pool = require('./index.js');

const getQuestions = (req, res, callback) => {
  let product_id = req.query.product_id;

  let page = req.query.page ? req.query.page : 1;
  let count =  req.query.count ? req.query.count : 5;

  if (product_id) {
    pool.query(`WITH question_ids AS (
      SELECT *
      FROM questions
      WHERE product_id = $1
      ),answer_ids as (
        SELECT  q.id as qid, a.id as aid, a.question_id, a.body, a.date_written, a.helpful, a.reported
        FROM  question_ids as q
              INNER JOIN answers as a
              ON q.id = a.question_id
      ), photo_ids as (
              SELECT  p.id as photo_id, p.answer_id, a.question_id as qid, p.url
        FROM answer_ids as a
         INNER JOIN photos as p
         ON p.answer_id = aid
      )  SELECT  q.id as question_id, q.body as question_body, q.question_date, q.asker_name, q.helpful as question_helpfulness,q.reported,json_agg(answer_data) as answers
      FROM  question_ids as q
      LEFT JOIN (
              SELECT
                   a.question_id,
                   a.aid as id,
                        a.body as body,
                   a.date_written as date,
               a.helpful as helpfulness,
                       json_agg(p) as photos
              FROM answer_ids as a
              LEFT JOIN  (
                      SELECT photo_ids.photo_id, photo_ids.answer_id, photo_ids.url
                      FROM answer_ids
                      JOIN photo_ids
                      ON photo_ids.answer_id = answer_ids.aid
              ) AS p
              ON p.answer_id = a.aid
              GROUP BY p.answer_id, a.question_id, a.aid,a.body, a.date_written, a.helpful, a.reported
      ) AS answer_data
      ON q.id = answer_data.question_id
      GROUP BY answer_data.question_id, q.id, q.body, q.question_date, q.asker_name, q.helpful,q.reported;`, [product_id])
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
  if (question_id) {
    pool.query(`WITH
    answer_ids as (
      SELECT  a.id as aid, a.question_id, a.body, a.answer_date, a.helpful, a.reported, a.answerer_name
      FROM  answers as a
            WHERE a.question_id = $1
    ), photo_ids as (
            SELECT  p.id as photo_id, p.answer_id, a.question_id as qid, p.url
      FROM answer_ids as a
       INNER JOIN photos as p
       ON p.answer_id = aid
    )  SELECT *
    FROM (
            SELECT
                 a.question_id,
                 a.aid as answer_id,
                      a.body as body,
                 a.answer_date as date,
                     a.answerer_name,
             a.helpful as helpfulness,
                  CASE WHEN count(p.id)= 0 THEN array_to_json('{}'::int[]) ELSE json_agg(json_build_object('id',p.id,'url',p.url)) END as photos
            FROM answer_ids as a
            LEFT JOIN  (
                    SELECT photo_ids.photo_id as id, photo_ids.answer_id , photo_ids.url as url
                    FROM answer_ids
                    JOIN photo_ids
                    ON photo_ids.answer_id = answer_ids.aid

            ) AS p
            ON p.answer_id = a.aid
            GROUP BY p.answer_id, a.question_id, a.aid,a.body, a.answer_date, a.helpful, a.reported, a.answerer_name

    ) AS answer_data
  `, [question_id])
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


module.exports = {
  getQuestions,
  getAnswers,
  reportAnswer,
  updateAnswer,
  reportQuestion,
  updateQuestion,
}