const {apiKey} = require("config.json");

function testScript(){
  document.getElementById('test').innerHTML = apiKey;
}
