require('dotenv').config();
const express = require("express");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 8080;
const apiKey = process.env.APIKEY;
const path = require("path");
const https = require("https");

app.use(express.static("public"));
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname+"/views/main.html"));
});

app.get("/api/get", function(req, res) {

  let city = req.query.city;
  if (process.env.environment === "dev"){
    res.sendFile(path.join(__dirname+"/public/js/weather.json")); //dev
  } else{
    getWeatherAjax(res,city);
  }
});

app.listen(port, () => console.log(`Weather App listening on port ${port}!`));

function getWeatherAjax(response, city) {
  const url =
    "https://api.weatherbit.io/v2.0/current?city="+ city + "&key=" + apiKey;

  https.get(url, res => {
    res.setEncoding("utf8");
    let body = "";
    res.on("data", data => {
      body += data;
    });
    res.on("end", () => {
      if (body){
        console.log(body);
        var weather = {"status": 1, "data": JSON.parse(body)["data"][0]};
      } else {
        var weather = {"status": 2}
      }

      response.send(weather);
    });
  });
}
