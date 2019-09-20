const express = require("express");

const app = express();
const port = 80;

app.get("*", (req, res) => {
  console.log("get request received...");
  console.log("req.query:", req.query);
  res.send("response");
});

app.post("*", (req, res) => {
  console.log("post request received...");
  console.log("req.body:", req.body);
  res.send("response...");
});

app.listen(port, err => {
  if (err) return console.error("error starting server:", err);
  console.log("server started on port", port);
});
