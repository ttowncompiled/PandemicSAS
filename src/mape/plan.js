const env = require('./env/env.js');
const sys = require('./sys/sys.js');

exports.plan = (model, probe, analysis) => {
    if (probe.player === 'sys') {
        return sys.plan(model, probe, analysis);
    } else {
        return env.plan(model, probe, analysis);
    }
};
