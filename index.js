const express = require('express')
const app = express()
const port = 81
var mustacheExpress = require('mustache-express');
var path = require('path');

app.engine('html', mustacheExpress())
// app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static('public'))
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.get('/', function(req, res) {
    res.render("hello.html", {"yourname": "World"});
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
