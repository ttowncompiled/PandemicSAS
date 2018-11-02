const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const body_parser = require('body-parser');
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

const fs = require('fs');
const yaml = require('js-yaml');
const Mustache = require('mustache');

const app_port = parseInt(process.argv[2]);
const main_port = parseInt(process.argv[3]);

io.on('connection', (socket) => {
    console.log('>>> connected!');
    socket.on('disconnect', () => {
        console.log('>>> disconnected!');
    });
});

app.get('/start', (req, res) => {
    res.send();
});

app.get('/monitor', (req, res) => {
    res.send();
});

app.get('/analyze', (req, res) => {
    res.send();
});

app.get('/plan', (req, res) => {
    res.send();
});

app.get('/execute', (req, res) => {
    res.send();
});

app.get('/stop', (req, res) => {
    res.send();
});

app.get('/back', (req, res) => {
    res.send();
});

app.get('/', (req, res) => {
    let config = yaml.safeLoad(fs.readFileSync('config.yml', 'utf8'));
    res.send(Mustache.render(fs.readFileSync('index.mustache', 'utf8'), config));
});

app.get('/lib/css/bootstrap.min.css', (req, res) => {
    res.sendFile(__dirname + '/node_modules/bootstrap/dist/css/bootstrap.min.css');
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

app.get('/lib/js/jquery.min.js', (req, res) => {
    res.sendFile(__dirname + '/node_modules/jquery/dist/jquery.min.js');
});

app.get('/lib/js/popper.min.js', (req, res) => {
    res.sendFile(__dirname + '/node_modules/popper.js/dist/popper.min.js');
});

app.get('/lib/js/bootstrap.bundle.min.js', (req, res) => {
    res.sendFile(__dirname + '/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js');
});

app.get('/lib/js/vis.min.js', (req, res) => {
    res.sendFile(__dirname + '/node_modules/vis/dist/vis.min.js');
});

app.get('/lib/js/socket.io.js', (req, res) => {
    res.sendFile(__dirname + '/node_modules/socket.io-client/dist/socket.io.js');
});

app.get('/lib/js/axios.min.js', (req, res) => {
    res.sendFile(__dirname + '/node_modules/axios/dist/axios.min.js');
});

app.get('/app/app.js', (req, res) => {
    res.sendFile(__dirname + '/app.js');
});

http.listen(app_port, () => {
    console.log('listening on localhost:' + app_port);
});
