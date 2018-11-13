const model = require('../model/model.js');

const monitor_module = require('./monitor.js');
const analyze_module = require('./analyze.js');
const plan_module = require('./plan.js');
const execute_module = require('./execute.js');

let monitor_state = null;
let analyze_state = null;
let plan_state = null;
let execute_state = null;

let state = '';

module.exports = {
    start: (config) => {
        monitor_state = new Promise((resolve, reject) => {
            if (model.start(config)) {
                resolve(monitor_module.monitor(model));
            } else {
                reject(new Error('could not start model'));
            }
        });
        state = 'monitor';
        return monitor_state;
    },

    monitor: () => {
        monitor_state = new Promise((resolve, reject) => {
            resolve(monitor_module.monitor(model));
        });
        state = 'monitor';
        return monitor_state;
    },

    analyze: () => {
        analyze_state = new Promise((resolve, reject) => {
            monitor_state.then((probe) => {
                resolve(analyze_module.analyze(model, probe));
            })
            .catch((reason) => reject(reason));
        });
        state = 'analyze';
        return analyze_state;
    },

    plan: () => {
        plan_state = new Promise((resolve, reject) => {
            monitor_state.then((probe) => {
                analyze_state.then((analysis) => {
                    resolve(plan_module.plan(model, probe, analysis));
                })
                .catch((reason) => reject(reason));
            })
            .catch((reason) => reject(reason));
        });
        state = 'plan';
        return plan_state;
    },

    execute: () => {
        execute_state = new Promise((resolve, reject) => {
            monitor_state.then((probe) => {
                plan_state.then((plan) => {
                    resolve(execute_module.execute(model, probe, plan));
                })
                .catch((reason) => reject(reason));
            })
            .catch((reason) => reject(reason));
        });
        state = 'execute';
        return execute_state;
    },

    stop: () => {
        return new Promise((resolve, reject) => {
            if (model.stop()) {
                monitor_state = null;
                analyze_state = null;
                plan_state = null;
                execute_state = null;
                state = '';
                resolve(true);
            } else {
                reject(new Error('unable to stop model'));
            }
        });
    },
};
