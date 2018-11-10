const env = require('./env/env.js');
const sys = require('./sys/sys.js');

exports.analyze = (probe) => {
    if (probe.player === 'sys') {
        return sys.sysAnalysis(probe);
    } else {
        return env.envAnalysis(probe);
    }
};
