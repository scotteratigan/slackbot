require("dotenv").config();
const { createEventAdapter } = require("@slack/events-api");
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;

// Read the port from the environment variables, fallback to 3000 default.
const port = process.env.PORT || 3000;

// Initialize the adapter to trigger listeners with envelope data and headers
const slackEvents = createEventAdapter(slackSigningSecret, {
  includeBody: true,
  includeHeaders: true
});

// Listeners now receive 3 arguments
slackEvents.on("message", (event, body, headers) => {
  console.log(
    `Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`
  );
  console.log(
    `The event ID is ${body.event_id} and time is ${body.event_time}`
  );
  if (headers["X-Slack-Retry-Num"] !== undefined) {
    console.log(
      `The delivery of this event was retried ${
        headers["X-Slack-Retry-Num"]
      } times because ${headers["X-Slack-Retry-Reason"]}`
    );
  }
});

// All errors in listeners are caught here. If this weren't caught, the program would terminate.
slackEvents.on("error", error => {
  console.log(error.name); // TypeError
});

(async () => {
  const server = await slackEvents.start(port);
  console.log(`Listening for events on ${server.address().port}`);
})();
