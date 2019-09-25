const express = require("express");
// const http = require("http");
const https = require("https");
const fs = require("fs");

const app = express();
const port = 443;

// Cfreate redirect for http connections:
var http = express.createServer();
http.get("*", function(req, res) {
  res.redirect("https://" + req.headers.host + req.url);
});

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
      // key: fs.readFileSync("./")
      passphrase: "honecapital"
    },
    app
  )
  .listen(port);
