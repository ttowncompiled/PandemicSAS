const analyzer = require('./analyzer.js');
const planner = require('./planner.js');
const executor = require('./executor.js');

module.exports = {
    analysis: () => analyzer.analysis(),
    plan: () => planner.plan(),
    execute: () => executor.execute(),
};
