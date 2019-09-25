var Botkit = require("botkit");
require("dotenv").config();

console.log(process.env.CLIENT_ID);

if (
  !process.env.CLIENT_ID ||
  !process.env.CLIENT_SECRET ||
  !process.env.PORT ||
  !process.env.VERIFICATION_TOKEN ||
  !process.env.CLIENT_SIGNING_SECRET ||
  !process.env.BOT_TOKEN
) {
  console.log(
    "Error: Specify CLIENT_ID, CLIENT_SECRET, VERIFICATION_TOKEN and PORT in environment"
  );
  process.exit(1);
} else {
  console.log("Good job, you have the variables!");
}

var controller = Botkit.slackbot({
  json_file_store: "./db_slackbutton_slash_command/",
  debug: true,
  clientSigningSecret: process.env.CLIENT_SIGNING_SECRET
});

controller.configureSlackApp({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  clientSigningSecret: process.env.CLIENT_SIGNING_SECRET,
  scopes: ["commands", "bot"]
});

controller.setupWebserver(process.env.PORT, function(err, webserver) {
  controller.createWebhookEndpoints(controller.webserver);
  controller.createOauthEndpoints(controller.webserver, function(
    err,
    req,
    res
  ) {
    if (err) {
      res.status(500).send("ERROR: " + err);
    } else {
      res.send("Success!");
    }
  });
});

var bot = controller
  .spawn({
    token: process.env.BOT_TOKEN,
    incoming_webhook: {
      url: "https://hooks.slack.com/services/YOUR/NEW/WEBHOOK"
    }
  })
  .startRTM();

setInterval(() => {
  bot.config.incoming_webhook.url =
    "https://hooks.slack.com/services/YOUR/NEW/WEBHOOK";
  bot.sendWebhook(
    {
      attachments: [
        {
          text: "Pinging the standup-bot"
        }
      ]
    },
    function(err, res) {
      if (err) {
        console.log("web err", err);
      }
    }
  );
}, 300000);

controller.hears("hi", "direct_message", function(bot, message) {
  bot.reply(message, "Hello.");
});

controller.hears(["webhook", "webhook2"], "direct_message", function(
  bot,
  message
) {
  if (message.text == "webhook") {
    bot.config.incoming_webhook.url =
      "https://hooks.slack.com/services/YOUR/NEW/WEBHOOK";
  } else {
    bot.config.incoming_webhook.url =
      "https://hooks.slack.com/services/YOUR/NEW/WEBHOOK";
  }
  bot.sendWebhook(
    {
      text: "Hey we've got the webhook!"
    },
    function(err, res) {
      if (err) {
        console.log("web err", err);
      }
    }
  );
});

controller.on("slash_command", function(bot, message) {
  console.log("heard a slash command!");
  bot.replyAcknowledge();
  switch (message.command) {
    case "/echo":
      bot.reply(message, "heard ya!");
      break;
    default:
      bot.reply(message, "Did not recognize that command, sorry!");
  }
});
