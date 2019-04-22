const express = require('express')
const axios = require("axios");
const app = express()
const port = 81
const {apiKey} = require('./config.json');
var mustacheExpress = require('mustache-express');
var path = require('path');
const url = "https://api.weatherbit.io/v2.0/current?city=rovaniemi,fi&key=" + apiKey;
const https = require("https");

app.engine('html', mustacheExpress())
// app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static('public'))
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.get('/', function(req, res) {
    getWeather(res);

});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))



function getWeather(response){
  https.get(url, res => {
  res.setEncoding("utf8");
  let body = "";
  res.on("data", data => {
    console.log(data);
    body += data;
  });
  res.on("end", () => {
    var weather = JSON.parse(body)['data'][0];
    response.render("hello.html", {
      "description": weather['weather']['description'],
      "temp":weather['temp']
    });
  });
});
}
