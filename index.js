const express = require("express");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 8080;
//const {apiKey} = require('./config.json'); //make .env
const apiKey = process.env.APIKEY;
var mustacheExpress = require("mustache-express");
var path = require("path");

const https = require("https");

app.engine("html", mustacheExpress());
// app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static("public"));
app.set("view engine", "html");
app.set("views", __dirname + "/views");
app.get("/", function(req, res) {
  getWeather(res, "rovaniemi,fi");
});

app.get("/api/get", function(req, res) {

  let city = req.query.city;
  getWeatherAjax(res,city);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

function getWeather(response, city) {
  const url =
    "https://api.weatherbit.io/v2.0/current?city="+ city + "&key=" + apiKey;

  https.get(url, res => {
    res.setEncoding("utf8");
    let body = "";
    res.on("data", data => {
      console.log(data);
      body += data;
    });
    res.on("end", () => {
      var weather = JSON.parse(body)["data"][0];
      response.render("main.html", {
        description: weather["weather"]["description"],
        temp: weather["temp"],
        location: weather["city_name"],
        country_code: weather["country_code"]
      });
    });
  });
}

function getWeatherAjax(response, city) {
  const url =
    "https://api.weatherbit.io/v2.0/current?city="+ city + "&key=" + apiKey;

  https.get(url, res => {
    res.setEncoding("utf8");
    let body = "";
    res.on("data", data => {
      console.log(data);
      body += data;
    });
    res.on("end", () => {
      if (body){
        var weather = {"status": 1, "data": JSON.parse(body)["data"][0]};
      } else {
        var weather = {"status": 2}
      }

      response.send(weather);
    });
  });
}
