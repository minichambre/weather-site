function submitCity() {
  let city = document.getElementById("cityInput");
  let temp = document.getElementById("temp");
  let description = document.getElementById("description");
  let location = document.getElementById("location");
  fetch("/api/get?city=" + city.value)
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      if (myJson.status === 1) {
        var weather = myJson.data;
      } else {
        console.log("Error occurred");
        return;
      }
      temp.innerHTML = weather["temp"] + " degrees celcius";
      description.innerHTML = weather["weather"]["description"];
      location.innerHTML = "in " + weather["city_name"] +", " + weather["country_code"];
    });
}
