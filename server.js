var http = require('https')
var fs = require('fs')
var path = require('path');
var express = require('express');

var dictionaryKeys = JSON.parse(fs.readFileSync('dictionary.keys', 'utf-8'))

var app = express();

app.get(['/', '/thunks', '/sagas'], function(req, res) {
  res.sendFile(path.join(__dirname, 'app.html'));
});

app.get('/definition/:word', function(req, res) {
  var options = {
    "method": "GET",
    "hostname": "od-api.oxforddictionaries.com",
    "port": null,
    "path": "/api/v1/entries/en/" + req.params.word + "/definitions",
    "headers": {
      "app_id": dictionaryKeys.appId,
      "app_key": dictionaryKeys.appKey,
      "cache-control": "no-cache",
      "postman-token": "df236889-e0df-d74f-e053-b4d066b0c5eb"
    }
  };

  var oxfordReq = http.request(options, function (oxfordRes) {
    var chunks = [];
    oxfordRes.on("data", function (chunk) {
      chunks.push(chunk);
    });

    oxfordRes.on("end", function () {
      var body = Buffer.concat(chunks);
      res.send(body.toString())
    });
  });
  oxfordReq.end()
})

app.listen(8001)
