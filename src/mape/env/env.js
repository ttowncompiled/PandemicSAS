const analyzer = require('./analyzer.js');
const planner = require('./planner.js');
const executor = require('./executor.js');

module.exports = {
    analysis: (probe) => analyzer.analysis(probe),
    plan: (analysis) => planner.plan(analysis),
    execute: (plan, manager, reporter) => executor.execute(plan, manager, reporter),
};
