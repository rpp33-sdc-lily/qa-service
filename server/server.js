const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.status(200).send('hello, FEC');
});




// var server = app.listen(port, () => {
//   console.log(`Now listening on port ${port} at http://localhost:${port}`);
// });

module.exports = app;