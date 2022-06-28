const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.all('/api/*', async (req, res) => {
  const { WebClient, LogLevel } = await import("@slack/web-api");

  const client = new WebClient(process.env.SLACK_TOKEN, {
    logLevel: LogLevel.DEBUG
  });

  await client.chat.postMessage({
      channel: "U03200689",
      username: "SMS",
      text: `*From:* +${req.query.msisdn}\n*Text:*\n${req.query.text}`,
      icon_emoji: ":envelope:",
      "blocks": [
        {
          "type": "section",
          "text": {
            "text": req.query.text,
            "type": "mrkdwn"
          },
          "fields": [
            {
              "type": "mrkdwn",
              "text": "*From*"
            },
            {
              "type": "mrkdwn",
              "text": "*To*"
            },
            {
              "type": "plain_text",
              "text": `+${req.query.msisdn}`
            },
            {
              "type": "plain_text",
              "text": `+${req.query.to}`
            },
            {
              "type": "mrkdwn",
              "text": "*Date*"
            },
            {
              "type": "mrkdwn",
              "text": " "
            },
            {
              "type": "plain_text",
              "text": req.query['message-timestamp']
            },
          ]
        }
      ]
  });

  res.status(200).end();
});

module.exports = app;
