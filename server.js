var path = require('path');
var express = require('express');

var app = express();

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'app.html'));
});

app.listen(8000)
