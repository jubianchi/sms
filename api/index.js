const app = require('express')();
const bodyParser = require('body-parser');
const fetch = import('node-fetch');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

///api/sms?msisdn=33626721260&to=33644638451&messageId=2B000000072C6C61&text=tg+pf&type=text&keyword=TG&api-key=f767567a&message-timestamp=2022-06-28+15%3A35%3A29
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
