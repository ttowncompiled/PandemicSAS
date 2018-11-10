const env = require('./env/env.js');
const sys = require('./sys/sys.js');

exports.execute = (probe, plan) => {
    if (probe.player === 'sys') {
        return sys.execute(plan);
    } else {
        return env.execute(plan);
    }
};
