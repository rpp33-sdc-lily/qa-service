const app = require('./server')
var portNum = process.env.PORT_ENV ? process.env.PORT_ENV : 3000;

const port = portNum;



 app.listen(port, () => {
  console.log(`Now listening on port ${port} at http://localhost:${port}`);
});