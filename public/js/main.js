var cityOld = "";
var loading = "";
window.onload = function() {
  loading = document.querySelector('#mask');
  loading.style.display="block";
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
  if (window.location.hash)
  {
    city = window.location.hash.replace("#","").replace("%20"," ");
    document.querySelector('.inputCity').value = city;
  }else{
    city = "colchester,england"
  }
  fetch('/api/get?city=' + city)
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
    document.querySelector('.icon').src="https://www.weatherbit.io/static/img/icons/" + weather.weather.icon + ".png";
    document.querySelector('.description').innerHTML=weather.weather.description;
    document.querySelector('#location').innerHTML=weather.city_name + ", " + weather.country_code;
    let date = new Date(weather.ob_time);
    document.querySelector('#time').innerHTML= date.toLocaleTimeString();
    document.querySelector('#cloudCoverage').innerHTML= weather.clouds + "%";
    document.querySelector('#precipertation').innerHTML= weather.precip + "%";
    document.querySelector('#UV').innerHTML= Math.round(weather.uv);
    document.querySelector('#airQuality').innerHTML= Math.round(weather.aqi);
    loading.style.display="none";
}

function lookupCity(){
  loading.style.display="block";
  let element = document.querySelector('.error').style.visibility = "hidden";
  let city = document.querySelector('.inputCity').value;
  window.location.hash=city;
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
