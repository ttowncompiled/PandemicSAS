const env = require('./env/env.js');
const sys = require('./sys/sys.js');

exports.analyze = (probe) => {
    if (probe.player === 'sys') {
        return sys.analysis();
    } else {
        return env.analysis(probe);
    }
};
