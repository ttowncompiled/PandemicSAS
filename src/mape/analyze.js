const env = require('./env/env.js');
const sys = require('./sys/sys.js');

exports.analyze = (probe, adapting, needs_to_fly) => {
    if (probe.player === 'sys') {
        return sys.analysis(probe, adapting, needs_to_fly);
    } else {
        return env.analysis(probe);
    }
};
