const app = require('express')();
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.all('/api/*', async (req, res) => {
  console.log(req.body, req.query);

  await fetch('https://hooks.slack.com/services/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', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      channel: "@jubianchi",
      username: "SMS",
      text: `From: +${req.msisdn}\nText:\n${req.query.text}`,
      icon_emoji: ":envelope:",
    })
  })

  res.status(200).end();
});

module.exports = app;
