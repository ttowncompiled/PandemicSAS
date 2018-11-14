const env = require('./env/env.js');
const sys = require('./sys/sys.js');

exports.execute = (probe, plan, manager, reporter) => {
    if (probe.player === 'sys') {
        return sys.execute(plan, manager, reporter);
    } else {
        return env.execute(plan, manager, reporter);
    }
};
