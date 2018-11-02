const express = require('express');
const app = express();

const body_parser = require('body-parser');
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

const fs = require('fs');
const yaml = require('js-yaml');

const port = parseInt(process.argv[2]);
const config_filepath = process.argv[3];

app.get('/start', (req, res) => {
    let config = yaml.safeLoad(fs.readFileSync(config_filepath, 'utf8'));
    console.log(config);
    res.send(config);
});

app.listen(port, () => {
    console.log('listening on localhost:' + port);
});

