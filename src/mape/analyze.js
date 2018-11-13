const env = require('./env/env.js');
const sys = require('./sys/sys.js');

exports.analyze = (model, probe) => {
    if (probe.player === 'sys') {
        return sys.analysis(model, probe);
    } else {
        return env.analysis(model, probe);
    }
};
