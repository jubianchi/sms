const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

///api/sms?msisdn=33626721260&to=33644638451&messageId=2B000000072C6C61&text=tg+pf&type=text&keyword=TG&api-key=f767567a&message-timestamp=2022-06-28+15%3A35%3A29
app.all('/api/*', async (req, res) => {
  const fetch = (await import('node-fetch')).default;
  const { WebClient, LogLevel } = await import("@slack/web-api");

  const client = new WebClient(process.env.SLACK_TOKEN, {
    logLevel: LogLevel.DEBUG
  });

  console.log(req.body, req.query);

  console.log(await client.chat.postMessage({
      channel: "U03200689",
      username: "SMS",
      text: `*From:* +${req.query.msisdn}\n*Text:*\n${req.query.text}`,
      icon_emoji: ":envelope:",
  }));

  res.status(200).end();
});

module.exports = app;
