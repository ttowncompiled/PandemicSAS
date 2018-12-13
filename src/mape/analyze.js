const env = require('./env/env.js');
const sys = require('./sys/sys.js');

exports.analyze = (probe, adapting) => {
    if (probe.player === 'sys') {
        return sys.analysis(probe, adapting);
    } else {
        return env.analysis(probe);
    }
};
