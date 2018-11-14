const analyzer = require('./analyzer.js');
const planner = require('./planner.js');
const executor = require('./executor.js');

module.exports = {
    analysis: (probe) => analyzer.analysis(probe),
    plan: () => planner.plan(),
    execute: () => executor.execute(),
};
