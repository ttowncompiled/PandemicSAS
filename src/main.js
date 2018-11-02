const http = require('http').createServer();
const io = require('socket.io')(http);

const fs = require('fs');
const yaml = require('js-yaml');

const port = parseInt(process.argv[2]);
const config_filepath = process.argv[3];

io.on('connection', (socket) => {
    console.log('>>> connected!');

    socket.on('disconnect', () => {
        console.log('>>> disconnected!')
    });

    socket.on('/start', (_, fn) => {
        try {
            let config = yaml.safeLoad(fs.readFileSync(config_filepath, 'utf8'));
            console.log(config);
            fn(config);
        } catch(e) {
            console.log(e);
            fn(1);
        }
    });
});

http.listen(port, () => {
    console.log('listening on localhost:' + port);
});

