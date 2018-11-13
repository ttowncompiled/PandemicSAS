const env = require('./env/env.js');
const sys = require('./sys/sys.js');

exports.execute = (model, probe, plan) => {
    if (probe.player === 'sys') {
        return sys.execute(model, probe, plan);
    } else {
        return env.execute(model,probe, plan);
    }
};
