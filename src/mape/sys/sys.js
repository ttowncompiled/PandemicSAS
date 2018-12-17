const analyzer = require('./analyzer.js');
const planner = require('./planner.js');
const executor = require('./executor.js');

module.exports = {
    analysis: (probe, adapting, needs_to_fly, wait_to_cure) => analyzer.analysis(probe, adapting, needs_to_fly, wait_to_cure),
    plan: (probe, analysis, can_cure, adapting) => planner.plan(probe, analysis, can_cure, adapting),
    execute: (plan, manager, reporter) => executor.execute(plan, manager, reporter),
};
