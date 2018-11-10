const express = require('express');
const app = express();

const body_parser = require('body-parser');
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

const fs = require('fs');
const yaml = require('js-yaml');

const mape = require('./mape/mape.js');

const port = parseInt(process.argv[2]);
const config_filepath = process.argv[3];

app.get('/start', (req, res) => {
    let config = yaml.safeLoad(fs.readFileSync(config_filepath, 'utf8'));
    mape.start(config).then((result) => {
        res.send(result);
    })
    .catch((reason) => {
        console.log(reason);
        res.sendStatus(500);
    });
});

app.get('/monitor', (req, res) => {
    mape.monitor().then((result) => {
        res.send(result);
    })
    .catch((reason) => {
        console.log(reason);
        res.sendStatus(500);
    });
});

app.get('/analyze', (req, res) => {
    mape.analyze().then((result) => {
        res.send(result);
    })
    .catch((reason) => {
        console.log(reason);
        res.sendStatus(500);
    });
});

app.get('/plan', (req, res) => {
    mape.plan().then((result) => {
        res.send(result);
    })
    .catch((reason) => {
        console.log(reason);
        res.sendStatus(500);
    });
});

app.get('/execute', (req, res) => {
    mape.execute().then((result) => {
        res.send(result);
    })
    .catch((reason) => {
        console.log(reason);
        res.sendStatus(500);
    });
});

app.get('/stop', (req, res) => {
    mape.stop().then((result) => {
        res.send(result);
    })
    .catch((reason) => {
        console.log(reason);
        res.sendStatus(500);
    });
});

app.listen(port, () => {
    console.log('listening on localhost:' + port);
});
