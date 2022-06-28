const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.all('/api/:user', async (req, res) => {
  const { WebClient, LogLevel } = await import("@slack/web-api");

  const client = new WebClient(process.env.SLACK_TOKEN, {
    logLevel: LogLevel.INFO
  });

  const date = new Date(`${req.query['message-timestamp']} +0000`);

  await client.chat.postMessage({
      channel: req.params.user,
      text: `*From:* +${req.query.msisdn}\n*To:* ${req.query.to}\n\n${req.query.text}\n`,
      blocks: [
        {
          "type": "header",
          "text": {
            "type": "plain_text",
            "text": "Incoming SMS"
          }
        },
        {
          "type": "context",
          "elements": [
            {
              "type": "mrkdwn",
              "text": `:clock7: Date: *${date.toLocaleString('fr-FR', 'Europe/Paris')}*`
            },
            {
              "type": "mrkdwn",
              "text": `:iphone: From: *+${req.query.msisdn}*`
            },
            {
              "type": "mrkdwn",
              "text": `:iphone: To: *+${req.query.to}*`
            }
          ]
        },
        {
          "type": "divider"
        },
        {
          "type": "section",
          "text": {
            "text": `${req.query.text}\n`,
            "type": "mrkdwn"
          }
        }
      ]
  });

  res.status(200).end();
});

module.exports = app;
