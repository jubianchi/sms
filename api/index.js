const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.all('/api/:user', async (req, res) => {
  const { WebClient, LogLevel } = await import("@slack/web-api");

  const client = new WebClient(process.env.SLACK_TOKEN, {
    logLevel: LogLevel.INFO
  });

  await client.chat.postMessage({
      channel: req.params.user,
      username: "SMS",
      text: `*From:* +${req.query.msisdn}\n*Text:*\n${req.query.text}`,
      icon_emoji: ":envelope:",
      "blocks": [
        {
          "type": "section",
          "fields": [
            {
              "type": "mrkdwn",
              "text": `*From:* +${req.query.msisdn}`
            },
            {
              "type": "mrkdwn",
              "text": `*To:* +${req.query.to}`
            },
            {
              "type": "mrkdwn",
              "text": `*Date:* ${req.query['message-timestamp']}`
            },
          ],
          "text": {
            "text": req.query.text,
            "type": "mrkdwn"
          },
        }
      ]
  });

  res.status(200).end();
});

module.exports = app;
