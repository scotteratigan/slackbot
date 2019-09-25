const { createEventAdapter } = require("@slack/events-api");
const slackSigningSecret = "72db46fce7af069fb4e612b00c6ca2b7";
const slackEvents = createEventAdapter(slackSigningSecret);

// Read the port from the environment variables, fallback to 3000 default.
const port = process.env.PORT || 3000;

(async () => {
  // Start the built-in server
  const server = await slackEvents.start(port);

  // Log a message when the server is ready
  console.log(`Listening for events on ${server.address().port}`);
})();
