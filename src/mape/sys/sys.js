const analyzer = require('./analyzer.js');
const planner = require('./planner.js');
const executor = require('./executor.js');

module.exports = {
    analysis: (model, probe) => analyzer.analysis(model, probe),
    plan: (model, probe, analysis) => planner.plan(model, probe, analysis),
    execute: (model, probe, plan) => executor.execute(model, probe, plan),
};
