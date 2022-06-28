const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/api', (req, res) => {
  console.log(req.body);
  res.status(200).end();
});

module.exports = app;
