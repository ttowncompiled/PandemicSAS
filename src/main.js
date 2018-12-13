const express = require('express');
const app = express();

const body_parser = require('body-parser');
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

const fs = require('fs');
const yaml = require('js-yaml');

const mape = require('./mape/mape.js');
const manager = require('./model/manager.js');
const reporter = require('./utils/reporter.js');

const main_port = parseInt(process.argv[2]);
const app_port = parseInt(process.argv[3]);
const config_filepath = process.argv[4];
const scenario = parseInt(process.argv[5]);

let rep = null;

app.post('/outbreak', (req, res) => {
    manager.outbreak(req.body.location, req.body.disease, rep);
    res.sendStatus(200);
});

app.get('/start', (req, res) => {
    let config = yaml.safeLoad(fs.readFileSync(config_filepath, 'utf8'));
    if (manager.start(config, scenario)) {
        rep = reporter.init(app_port);
        mape.start(manager, rep).then((result) => {
                res.send(result);
            })
            .catch((reason) => {
                console.error(reason);
                res.sendStatus(500);
            });
    } else {
        console.error(new Error('could not start model'));
        res.sendStatus(500);
    }

});

app.get('/monitor', (req, res) => {
    mape.monitor().then((result) => {
        res.send(result);
    })
    .catch((reason) => {
        console.error(reason);
        res.sendStatus(500);
    });
});

app.get('/analyze', (req, res) => {
    mape.analyze().then((result) => {
        res.send(result);
    })
    .catch((reason) => {
        console.error(reason);
        res.sendStatus(500);
    });
});

app.get('/plan', (req, res) => {
    mape.plan().then((result) => {
        res.send(result);
    })
    .catch((reason) => {
        console.error(reason);
        res.sendStatus(500);
    });
});

app.get('/execute', (req, res) => {
    mape.execute().then((result) => {
        res.send(result);
    })
    .catch((reason) => {
        console.error(reason);
        res.sendStatus(500);
    });
});

app.get('/stop', (req, res) => {
    mape.stop().then((result) => {
        res.send(result);
    })
    .catch((reason) => {
        console.error(reason);
        res.sendStatus(500);
    });
});

app.listen(main_port, () => {
    console.log('listening on localhost:' + main_port);
});
