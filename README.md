# About
This server was created as a response to the significant increase in traffic for the Atilier e-commerce website. As the engineer responsible for all CRUD operations of the Questions and Answers section of the dated, monolith architecture, I chose to create a microservice based system. 
 #### After deploying and scaling 4 servers and a NGINX Load Balancer and cache, the QA micro service was able to serve 2600 RPS per second with a 0% error rate and a latency of less then 50ms.  This was a 158% increase in performance which satisifed the customer. 
   
![image](https://user-images.githubusercontent.com/8378155/176363058-29786834-6019-4d75-bcd1-1d0cf028038c.png)
 * please note. It says 2600 over a minute but the option for selecting 2600 requests per second was selected.

# Routes

#### Get questions for a product
`GET /qa/questions`<br>
 | Parameter      | Type |
| ----------- | ----------- |
| product_id | integer |


#### Submit questions for a product
`POST /qa/questions`<br>

 | Parameter      | Type |
| ----------- | ----------- |
| product_id | integer |
| body | string |
| name | string |
| email | string |


#### Get answers for a question
`GET /qa/questions/:question_id/answers`<br>
 | Parameter      | Type |
| ----------- | ----------- |
| question_id | integer |


#### Submit answer for a question
`POST /qa/questions/:question_id/answers`<br>
 | Parameter      | Type |
| ----------- | ----------- |
| question_id | integer |
| body | string |
| name | string |
| email | string |

## minor routes
#### Update helpfulness on question
`PUT /qa/questions/:question_id?/helpful`<br>
 | Parameter      | Type |
 | ----------- | ----------- |
 | question_id | integer |
#### Report  question
`PUT /qa/questions/:question_id?/report`<br>
 | Parameter      | Type |
 | ----------- | ----------- |
 | question_id | integer |
#### Update helpfulness on answer
`PUT /qa/answers/:answer_id?/helpful`<br>
 | Parameter      | Type |
 | ----------- | ----------- |
 | question_id | integer |
#### Report answer
`PUT /qa/answers/:answer_id?/report`<br>
 | Parameter      | Type |
 | ----------- | ----------- |
 | answer_id | integer |

# Technologies 
- Server
  - Node JS Express
- Database
  - PostgreSQL 
- Deployment
  - [AWS EC2 t2.micro instances](https://aws.amazon.com/pm/ec2/?trk=36c6da98-7b20-48fa-8225-4784bced9843&sc_channel=ps&sc_campaign=acquisition&sc_medium=ACQ-P%7CPS-GO%7CBrand%7CDesktop%7CSU%7CCompute%7CEC2%7CUS%7CEN%7CText&s_kwcid=AL!4422!3!488982705483!p!!g!!amazon%20ec2&ef_id=CjwKCAjwzeqVBhAoEiwAOrEmzZ1WzrsAKGLzVGmNhdA0QhpIPcdeqnH_zmUAQa25qryyDz5J_03i9BoCH3wQAvD_BwE:G:s&s_kwcid=AL!4422!3!488982705483!p!!g!!amazon%20ec2) 
- Load Balancer and Cache
  - [NGINX](https://nginx.org/en/docs/?_ga=2.222689757.759896580.1656443043-200779045.1656443043) 
  - [loaderio](https://loader.io/)
- Monintoring Bottleneck Detection
  - [K6](https://k6.io/docs/)
  - [New Relic](https://docs.newrelic.com/)
  - [htop](https://htop.dev/)
  
