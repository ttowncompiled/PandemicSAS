const monitor_module = require('./monitor.js');
const analyze_module = require('./analyze.js');
const plan_module = require('./plan.js');
const execute_module = require('./execute.js');

let monitor_state = null;
let analyze_state = null;
let plan_state = null;
let execute_state = null;

let manager = null;
let reporter = null;

let mape_loop_active = false;

let needs_to_fly = false;
let wait_to_cure = false;
let can_cure = false;

module.exports = {
    start: (m, r) => {
        manager = m;
        reporter = r;
        monitor_state = new Promise((resolve, reject) => {
            resolve(monitor_module.monitor(manager.view()));
        });
        return monitor_state;
    },

    monitor: () => {
        monitor_state = new Promise((resolve, reject) => {
            resolve(monitor_module.monitor(manager.view()));
        });
        return monitor_state;
    },

    analyze: () => {
        analyze_state = new Promise((resolve, reject) => {
            monitor_state.then((probe) => {
                let [ tree, ok, cure_avail ] = analyze_module.analyze(probe,
                        mape_loop_active, needs_to_fly, wait_to_cure);
                if (! ok && ! mape_loop_active) {
                    reporter.reportAdapt();
                    mape_loop_active = true;
                }
                can_cure = cure_avail;
                resolve(tree);
            })
            .catch((reason) => reject(reason));
        });
        return analyze_state;
    },

    plan: () => {
        plan_state = new Promise((resolve, reject) => {
            monitor_state.then((probe) => {
                analyze_state.then((analysis) => {
                    let [ tree, should_fly, should_wait ] = plan_module.plan(probe, analysis,
                            can_cure, mape_loop_active);
                    if (should_fly) {
                        needs_to_fly = true;
                    }
                    if (should_wait) {
                        wait_to_cure = true;
                    }
                    resolve(tree);
                })
                .catch((reason) => reject(reason));
            })
            .catch((reason) => reject(reason));
        });
        return plan_state;
    },

    execute: () => {
        execute_state = new Promise((resolve, reject) => {
            monitor_state.then((probe) => {
                plan_state.then((plan) => {
                    let [ not_ok, done ] = execute_module.execute(probe, plan, manager, reporter);
                    if (done) {
                        reporter.reportGameLoss();
                    } else if (not_ok && ! mape_loop_active) {
                        reporter.reportAdapt();
                        mape_loop_active = true;
                    } else if (! not_ok && mape_loop_active) {
                        reporter.reportStable();
                        mape_loop_active = false;
                    }
                    resolve({});
                })
                .catch((reason) => reject(reason));
            })
            .catch((reason) => reject(reason));
        });
        return execute_state;
    },

    stop: () => {
        return new Promise((resolve, reject) => {
            if (manager.stop()) {
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
