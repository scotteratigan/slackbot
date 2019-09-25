const { createEventAdapter } = require("@slack/events-api");
const slackSigningSecret = "72db46fce7af069fb4e612b00c6ca2b7";
const slackEvents = createEventAdapter(slackSigningSecret);
const port = process.env.PORT || 3000;

// Attach listeners to events by Slack Event "type". See: https://api.slack.com/events/message.im
slackEvents.on("message", event => {
  console.log(
    `Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`
  );
});

(async () => {
  const server = await slackEvents.start(port);
  console.log(`Listening for events on ${server.address().port}`);
})();
