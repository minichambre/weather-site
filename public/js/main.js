var cityOld = "";

window.onload = function() {

  //Empty input box when they click it.
  document.querySelector('.inputCity').addEventListener('click', function() {
    cityOld = this.value;
    this.value = "";
  }, false);

  //Return input box value when it loses focus, if they typed nothing.
  document.querySelector('.inputCity').addEventListener('blur', function() {
    if (this.value == ""){
      this.value = cityOld;
    }
  }, false);
  getWeatherInitial();
};

//Grab the weather from the API.
function getWeatherInitial(){
  fetch('/api/get?city=colchester,england')
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      if (json.status === 1){
        parseWeather(json.data);
      } else {
      }
    });
}

//Use the API to fill out the DOM
function parseWeather(weather){
    document.querySelector('.temp').innerHTML=weather.temp;
    document.querySelector('.description').innerHTML=weather.weather.description;
    document.querySelector('#location').innerHTML=weather.city_name + ", " + weather.country_code;
}

function lookupCity(){
  let element = document.querySelector('.error').style.visibility = "hidden";
  let city = document.querySelector('.inputCity').value;
  getWeather(city);

}

//Grab the weather from the API.
function getWeather(city){
  fetch('/api/get?city='+city)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      if (json.status === 1){
        console.log("okay!");
        parseWeather(json.data);
      } else {
        console.log("oh no...");
        showError("Couldn't find that, try 'city, country' as a format")
      }
    });
}

function showError(error){
  let element = document.querySelector('.error');
  element.innerHTML = error;
  element.style.visibility = "visible";
}
