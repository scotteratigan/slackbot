const express = require("express");
const https = require("https");
const fs = require("fs");

const app = express();
const port = 443;

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

// we will pass our 'app' to 'https' server
https
  .createServer(
    {
      key: fs.readFileSync("./key.pem"),
      cert: fs.readFileSync("./cert.pem"),
      passphrase: "honecapital"
    },
    app
  )
  .listen(port);
