const app = require('./server')
const port = 3000;


 app.listen(port, () => {
  console.log(`Now listening on port ${port} at http://localhost:${port}`);
});