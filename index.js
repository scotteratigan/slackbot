"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const axios = require("axios");
require("dotenv").config();

const GiphyAPIKey = process.env.GIPHY;
const WeatherAPIKey = process.env.OPEN_WEATHER_MAP;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const server = app.listen(80, () => {
  console.log(
    "Express server listening on port %d in %s mode",
    server.address().port,
    app.settings.env
  );
});

app.get("/", (req, res) => {
  // not used in app, but useful for testing
  res.send("Server is reachable.");
});

app.post("/", (req, res) => {
  const text = req.body.text;
  console.log("argument is:", text);
  const url = req.body.text
    ? `https://api.giphy.com/v1/gifs/search?api_key=${GiphyAPIKey}&q=${text}`
    : `https://api.giphy.com/v1/gifs/random?api_key=${GiphyAPIKey}&tag=&rating=G`;
  axios.get(url).then(response => {
    const responseUrl = text
      ? response.data.data[0].url
      : response.data.data.url;
    res.json({
      response_type: "in_channel", // public to the channel
      text: `Random Image: (${responseUrl})`,
      attachments: [
        {
          image_url: responseUrl
        }
      ]
    });
  });
});

app.post("/weather", (req, res) => {
  axios
    .get(
      `http://api.openweathermap.org/data/2.5/weather?zip=94301&appid=${WeatherAPIKey}&units=imperial`
    )
    .then(response => {
      const { data } = response;
      const tempFahrenheit = data.main.temp;
      res.json({
        response_type: "in_channel", // public to the channel
        text:
          `Current weather conditions for Palo Alto, CA:\n` +
          `Temperature: ${tempFahrenheit}\n` +
          `Temp Range: ${data.main.temp_min} - ${data.main.temp_max}\n` +
          `Humidity: ${data.main.humidity}\n` +
          `Atmospheric Pressure: ${data.main.pressure} hPa`
      });
    });
});
