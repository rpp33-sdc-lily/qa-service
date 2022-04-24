


-- // id uuid NOT NULL DEFAULT uuid_generate_v4(),
--  question_id integer NOT NULL,
--  // CONSTRAINT questions_question_id_key UNIQUE (question_id)
-- CREATE DATABASE QuestionsAnswers;

DROP TABLE IF EXISTS public.questions CASCADE;
DROP TABLE IF EXISTS public.answers CASCADE;
DROP TABLE IF EXISTS public.photos  CASCADE;
DROP SEQUENCE IF EXISTS  q_id_seq CASCADE;
DROP SEQUENCE IF EXISTS  a_id_seq CASCADE;
DROP SEQUENCE IF EXISTS  p_id_seq CASCADE;

CREATE TABLE IF NOT EXISTS questions
(
   id integer NOT NULL,
    product_id integer NOT NULL,
    body character varying COLLATE pg_catalog."default",
    date_written bigint,
    asker_name character varying COLLATE pg_catalog."default",
    asker_email character varying COLLATE pg_catalog."default",
    reported boolean,
    helpful integer,
    CONSTRAINT questions_pkey PRIMARY KEY (id)
);
  \COPY questions from '/Users/chloem/RPP33/qa-service/database/files/questions.csv' delimiter ',' csv header;

  ALTER TABLE questions ADD COLUMN new_id UUID NULL;
  UPDATE questions SET new_id = CAST(LPAD(TO_HEX(id), 32, '0') AS UUID);
  ALTER TABLE IF EXISTS public.questions
     OWNER to postgres;
  ALTER TABLE questions ADD COLUMN question_date  timestamptz NULL;
  create index on questions (product_id);
  update questions SET question_date = to_timestamp(date_written/1000);
  CREATE SEQUENCE q_id_seq MINVALUE 3518964;
  ALTER TABLE questions
  ALTER id SET DEFAULT nextval('q_id_seq');
--   SELECT MAX(id)+1 FROM questions

-- CREATE ANSWERS TABLE
CREATE TABLE IF NOT EXISTS answers
(
   id integer NOT NULL,
    question_id integer NOT NULL REFERENCES questions (id),
    body character varying COLLATE pg_catalog."default",
    date_written bigint,
    answerer_name character varying COLLATE pg_catalog."default",
    answerer_email character varying COLLATE pg_catalog."default",
    reported boolean,
    helpful integer,
    CONSTRAINT answers_pkey PRIMARY KEY (id)
);

  \COPY answers from '/Users/chloem/RPP33/qa-service/database/files/answers.csv' delimiter ',' csv header;

  ALTER TABLE answers ADD COLUMN new_id UUID NULL;
  UPDATE answers SET new_id = CAST(LPAD(TO_HEX(id), 32, '0') AS UUID);
  ALTER TABLE answers ADD COLUMN answer_date  timestamptz NULL;
  update answers SET answer_date = to_timestamp(date_written/1000);
  create index on answers (question_id);
  CREATE SEQUENCE a_id_seq MINVALUE 6879307;
  ALTER TABLE answers
  ALTER id SET DEFAULT nextval('a_id_seq');

CREATE TABLE IF NOT EXISTS photos
(
   id integer NOT NULL,
   answer_id integer NOT NULL REFERENCES answers (id),
   url character varying COLLATE pg_catalog."default"
);
  \COPY photos from '/Users/chloem/RPP33/qa-service/database/files/answers_photos.csv' delimiter ',' csv header;
  ALTER TABLE photos ADD COLUMN new_id UUID NULL;
  UPDATE photos SET new_id = CAST(LPAD(TO_HEX(id), 32, '0') AS UUID);
  CREATE SEQUENCE p_id_seq MINVALUE 202;
  create index on photos (answer_id);
  ALTER TABLE photos
  ALTER id SET DEFAULT nextval('p_id_seq');

