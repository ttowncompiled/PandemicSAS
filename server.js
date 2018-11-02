const express = require('express');
const app = express();

const fs = require('fs');
const yaml = require('js-yaml');
const Mustache = require('mustache');

const port = parseInt(process.argv[2]);

app.get('/', (req, res) => {
    let config = yaml.safeLoad(fs.readFileSync('config.yml', 'utf8'));
    res.send(Mustache.render(fs.readFileSync('index.mustache', 'utf8'), config));
});

app.get('/lib/js/jquery.min.js', (req, res) => {
    res.sendFile(__dirname + '/node_modules/jquery/dist/jquery.min.js');
});

app.get('/lib/css/bootstrap.min.css', (req, res) => {
    res.sendFile(__dirname + '/node_modules/bootstrap/dist/css/bootstrap.min.css');
});

app.get('/lib/js/bootstrap.bundle.min.js', (req, res) => {
    res.sendFile(__dirname + '/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js');
});

app.get('/lib/css/open-iconic-bootstrap.min.css', (req, res) => {
    res.sendFile(__dirname + '/node_modules/open-iconic/font/css/open-iconic-bootstrap.min.css');
});

app.get('/lib/fonts/open-iconic.woff', (req, res) => {
    res.sendFile(__dirname + '/node_modules/open-iconic/font/fonts/open-iconic.woff');
});

app.get('/lib/fonts/open-iconic.ttf', (req, res) => {
    res.sendFile(__dirname + '/node_modules/open-iconic/font/fonts/open-iconic.ttf');
});

app.get('/lib/fonts/open-iconic.otf', (req, res) => {
    res.sendFile(__dirname + '/node_modules/open-iconic/font/fonts/open-iconic.otf');
});

app.get('/lib/css/vis.min.css', (req, res) => {
    res.sendFile(__dirname + '/node_modules/vis/dist/vis.min.css');
});

app.get('/lib/js/vis.min.js', (req, res) => {
    res.sendFile(__dirname + '/node_modules/vis/dist/vis.min.js');
});

app.get('/lib/js/socket.io.js', (req, res) => {
    res.sendFile(__dirname + '/node_modules/socket.io-client/dist/socket.io.js');
});

app.get('/app/app.js', (req, res) => {
    res.sendFile(__dirname + '/app.js');
});

app.listen(port, () => {
    console.log('listening on localhost:' + port);
});

