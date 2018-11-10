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
            model.start(config).then((game) => {
                resolve(monitor_module.monitor(game));
            })
            .catch((reason) => reject(reason));
        });
        state = 'monitor';
        return monitor_state;
    },

    monitor: () => {
        monitor_state = new Promise((resolve, reject) => {
            model.view().then((game) => {
                resolve(monitor_module.monitor(game));
            })
            .catch((reason) => reject(reason));
        });
        state = 'monitor';
        return monitor_state;
    },

    analyze: () => {
        analyze_state = new Promise((resolve, reject) => {
            monitor_state.then((monitor_result) => {
                resolve(analyze_module.analyze(monitor_result));
            })
            .catch((reason) => reject(reason));
        });
        state = 'analyze';
        return analyze_state;
    },

    plan: () => {
        plan_state = new Promise((resolve, reject) => {
            analyze_state.then((analysis_result) => {
                resolve(plan_module.plan(analysis_result));
            })
            .catch((reason) => reject(reason));
        });
        state = 'plan';
        return plan_state;
    },

    execute: () => {
        execute_state = new Promise((resolve, reject) => {
            plan_state.then((plan_result) => {
                resolve(execute_module.execute(plan_result));
            })
            .catch((reason) => reject(reason));
        });
        state = 'execute';
        return execute_state;
    },

    stop: () => {
        return new Promise((resolve, reject) => {
            model.stop().then((ok) => {
                if (ok) {
                    monitor_state = null;
                    analyze_state = null;
                    plan_state = null;
                    execute_state = null;
                    state = '';
                    resolve(true);
                } else {
                    reject(new Error('unable to stop model'));
                }
            })
            .catch((reason) => reject(reason));
        });
    },

    back: () => {
        return new Promise((resolve, reject) => {
            reject(new Error('TODO'));
        });
    },
};
