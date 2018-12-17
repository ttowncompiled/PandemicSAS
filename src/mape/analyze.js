const env = require('./env/env.js');
const sys = require('./sys/sys.js');

exports.analyze = (probe, adapting, needs_to_fly, wait_to_cure) => {
    if (probe.player === 'sys') {
        return sys.analysis(probe, adapting, needs_to_fly, wait_to_cure);
    } else {
        return env.analysis(probe);
    }
};
