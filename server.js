const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const body_parser = require('body-parser');
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

const axios = require('axios');

const app_port = parseInt(process.argv[2]);
const main_port = parseInt(process.argv[3]);

io.on('connection', (socket) => {
    console.log('>>> connected!');
    socket.on('disconnect', () => {
        console.log('>>> disconnected!');
    });
});

app.post('/info', (req, res) => {
    let msg = req.body.msg;
    console.log(`>>> ${msg}`);
    io.emit('info', `>>> ${msg}`);
    res.sendStatus(200);
});

app.get('/start', (_, res) => {
    axios.get(`http://localhost:${main_port}/start`)
        .then((response) => {
            res.send(response.data);
        })
        .catch((reason) => {
            console.log(reason);
            res.sendStatus(500);
        });
});

app.get('/monitor', (_, res) => {
    axios.get(`http://localhost:${main_port}/monitor`)
        .then((response) => {
            res.send(response.data);
        })
        .catch((reason) => {
            console.log(reason);
            res.sendStatus(500);
        });
});

app.get('/analyze', (_, res) => {
    axios.get(`http://localhost:${main_port}/analyze`)
        .then((response) => {
            res.send(response.data);
        })
        .catch((reason) => {
            console.log(reason);
            res.sendStatus(500);
        });
});

app.get('/plan', (_, res) => {
    axios.get(`http://localhost:${main_port}/plan`)
        .then((response) => {
            res.send(response.data);
        })
        .catch((reason) => {
            console.log(reason);
            res.sendStatus(500);
        });
});

app.get('/execute', (_, res) => {
    axios.get(`http://localhost:${main_port}/execute`)
        .then((response) => {
            res.send(response.data);
        })
        .catch((reason) => {
            console.log(reason);
            res.sendStatus(500);
        });
});

app.get('/stop', (_, res) => {
    axios.get(`http://localhost:${main_port}/stop`)
        .then((response) => {
            res.send(response.data);
        })
        .catch((reason) => {
            console.log(reason);
            res.sendStatus(500);
        });
});

app.get('/', (_, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/lib/css/bootstrap.min.css', (_, res) => {
    res.sendFile(__dirname + '/node_modules/bootstrap/dist/css/bootstrap.min.css');
});

app.get('/lib/css/open-iconic-bootstrap.min.css', (_, res) => {
    res.sendFile(__dirname + '/node_modules/open-iconic/font/css/open-iconic-bootstrap.min.css');
});

app.get('/lib/fonts/open-iconic.woff', (_, res) => {
    res.sendFile(__dirname + '/node_modules/open-iconic/font/fonts/open-iconic.woff');
});

app.get('/lib/fonts/open-iconic.ttf', (_, res) => {
    res.sendFile(__dirname + '/node_modules/open-iconic/font/fonts/open-iconic.ttf');
});

app.get('/lib/fonts/open-iconic.otf', (_, res) => {
    res.sendFile(__dirname + '/node_modules/open-iconic/font/fonts/open-iconic.otf');
});

app.get('/lib/css/vis.min.css', (_, res) => {
    res.sendFile(__dirname + '/node_modules/vis/dist/vis.min.css');
});

app.get('/lib/js/jquery.min.js', (_, res) => {
    res.sendFile(__dirname + '/node_modules/jquery/dist/jquery.min.js');
});

app.get('/lib/js/popper.min.js', (_, res) => {
    res.sendFile(__dirname + '/node_modules/popper.js/dist/popper.min.js');
});

app.get('/lib/js/bootstrap.bundle.min.js', (_, res) => {
    res.sendFile(__dirname + '/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js');
});

app.get('/lib/js/vis.min.js', (_, res) => {
    res.sendFile(__dirname + '/node_modules/vis/dist/vis.min.js');
});

app.get('/lib/js/socket.io.js', (_, res) => {
    res.sendFile(__dirname + '/node_modules/socket.io-client/dist/socket.io.js');
});

app.get('/lib/js/axios.min.js', (_, res) => {
    res.sendFile(__dirname + '/node_modules/axios/dist/axios.min.js');
});

app.get('/lib/js/mustache.min.js', (_, res) => {
    res.sendFile(__dirname + '/node_modules/mustache/mustache.min.js');
});

app.get('/app/app.js', (_, res) => {
    res.sendFile(__dirname + '/app/app.js');
});

app.get('/app/game.js', (_, res) => {
    res.sendFile(__dirname + '/app/game.js');
});

app.get('/app/action.js', (_, res) => {
    res.sendFile(__dirname + '/app/action.js');
});

app.get('/app/info.js', (_, res) => {
    res.sendFile(__dirname + '/app/info.js');
});

http.listen(app_port, () => {
    console.log('listening on localhost:' + app_port);
});
