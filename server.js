var express = require('express');
var app = express();
var port = parseInt(process.argv[2]);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/lib/js/jquery.min.js', function(req, res) {
    res.sendFile(__dirname + '/node_modules/jquery/dist/jquery.min.js');
});

app.get('/lib/css/bootstrap.min.css', function(req, res) {
    res.sendFile(__dirname + '/node_modules/bootstrap/dist/css/bootstrap.min.css');
});

app.get('/lib/js/bootstrap.bundle.min.js', function(req, res) {
    res.sendFile(__dirname + '/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js');
});

app.get('/lib/css/open-iconic-bootstrap.min.css', function(req, res) {
    res.sendFile(__dirname + '/node_modules/open-iconic/font/css/open-iconic-bootstrap.min.css');
});

app.get('/lib/fonts/open-iconic.woff', function(req, res) {
    res.sendFile(__dirname + '/node_modules/open-iconic/font/fonts/open-iconic.woff');
});

app.get('/lib/fonts/open-iconic.ttf', function(req, res) {
    res.sendFile(__dirname + '/node_modules/open-iconic/font/fonts/open-iconic.ttf');
});

app.get('/lib/fonts/open-iconic.otf', function(req, res) {
    res.sendFile(__dirname + '/node_modules/open-iconic/font/fonts/open-iconic.otf');
});

app.get('/lib/css/vis.min.css', function(req, res) {
    res.sendFile(__dirname + '/node_modules/vis/dist/vis.min.css');
});

app.get('/lib/js/vis.min.js', function(req, res) {
    res.sendFile(__dirname + '/node_modules/vis/dist/vis.min.js');
});

app.listen(port, function() {
    console.log('listening on localhost:' + port);
});

