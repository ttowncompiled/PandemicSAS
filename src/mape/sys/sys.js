const analyzer = require('./analyzer.js');
const planner = require('./planner.js');
const executor = require('./executor.js');

module.exports = {
    analysis: (probe, adapting) => analyzer.analysis(probe, adapting),
    plan: (probe, analysis) => planner.plan(probe, analysis),
    execute: (plan, manager, reporter) => executor.execute(plan, manager, reporter),
};
