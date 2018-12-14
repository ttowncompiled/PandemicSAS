const env = require('./env/env.js');
const sys = require('./sys/sys.js');

exports.plan = (probe, analysis, can_cure, adapting) => {
    if (probe.player === 'sys') {
        return sys.plan(probe, analysis, can_cure, adapting);
    } else {
        return env.plan(analysis);
    }
};
