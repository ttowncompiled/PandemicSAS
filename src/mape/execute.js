const env = require('./env/env.js');
const sys = require('./sys/sys.js');

exports.execute = (probe, plan, manager) => {
    if (probe.player === 'sys') {
        return sys.execute();
    } else {
        return env.execute(plan, manager);
    }
};
