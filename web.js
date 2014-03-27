var express = require("express");
var logfmt = require("logfmt");
var request = require('request');
var zlib = require('zlib');
// var gzip = zlib.createGzip();

var app = express();

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.get('/:id', function (req, res){
  var id = req.params.id;
  request('https://api.stackexchange.com/2.1/users/1187299/?site=stackoverflow', function (error, response, body) {
    console.log('first')
    if (!error && response.statusCode == 200) {
      // console.log('hello');
      console.log(response.headers['content-encoding']);
      var buffer = new Buffer('eJzT0yMAAGTvBe8=', 'utf-8');
      // console.log(buffer);
      // console.log(response.headers);
      zlib.gunzip(buffer, function(err, decoded) {
        console.log(err);
        console.log(decoded);
        console.log(decoded.toString);

        // callback(err, decoded && decoded.toString());
      });
      // console.log(zlib.unzip(response));
    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ a: 1 }));
  });
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});