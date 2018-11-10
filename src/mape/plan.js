const env = require('./env/env.js');
const sys = require('./sys/sys.js');

exports.plan = (probe, analysis) => {
    if (probe.player === 'sys') {
        return sys.plan(analysis);
    } else {
        return env.plan(analysis);
    }
};
