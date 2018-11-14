// const axios, io, nodes, edges;
// gameInit, gameUpdate, gameClear
// treeInit, treeUpdate, treeClear
// infoInit, infoUpdate, infoClear
(() => {

    const socket                = io();

    const monitor_btn           = $('#monitor');
    const analyze_btn           = $('#analyze');
    const plan_btn              = $('#plan');
    const execute_btn           = $('#execute');

    const play_or_pause_btn     = $('#play-pause');
    const stop_btn              = $('#stop');
    const forward_btn           = $('#forward');

    let step = 0;
    let paused = false;
    let stopped = true;

    function start() {
        return new Promise((resolve) => {
            axios.get('/start')
                .then((response) => {
                    console.log(response.data);
                    gameInit(response.data);
                    infoInit(response.data);
                    resolve(true);
                })
                .catch((e) => {
                    console.error(e);
                    resolve(false);
                });
        });
    }

    function monitor() {
        return new Promise((resolve) => {
            axios.get('/monitor')
                .then((response) => {
                    console.log(response.data);
                    gameUpdate(response.data);
                    infoUpdate(response.data);
                    actionClear();
                    resolve(true);
                })
                .catch((e) => {
                    console.error(e);
                    resolve(false);
                });
        });
    }

    function analyze() {
        return new Promise((resolve) => {
            axios.get('/analyze')
                .then((response) => {
                    console.log(response.data);
                    actionInit(response.data);
                    resolve(true);
                })
                .catch((e) => {
                    console.error(e);
                    resolve(false);
                });
        });
    }

    function plan() {
        return new Promise((resolve) => {
            axios.get('/plan')
                .then((response) => {
                    console.log(response.data);
                    actionUpdate(response.data);
                    resolve(true);
                })
                .catch((e) => {
                    console.error(e);
                    resolve(false);
                });
        });
    }

    function execute() {
        return new Promise((resolve) => {
            axios.get('/execute')
                .then((response) => {
                    console.log(response.data);
                    resolve(true);
                })
                .catch((e) => {
                    console.error(e);
                    resolve(false);
                });
        });
    }

    function stop() {
        return new Promise((resolve) => {
            axios.get('/stop')
                .then((response) => {
                    gameClear();
                    actionClear();
                    infoClear();
                    resolve(true);
                })
                .catch((e) => {
                    console.error(e);
                    resolve(false);
                });
        });
    }

    function switch_active(curr_active, next_active) {
        if (!!curr_active && curr_active.hasClass('active')) {
            curr_active.toggleClass('btn-info');
            curr_active.toggleClass('btn-outline-light');
            curr_active.toggleClass('active');
        }
        if (!!next_active) {
            next_active.toggleClass('btn-outline-light');
            next_active.toggleClass('btn-info');
            next_active.toggleClass('active');
        }
    }

    function incStep() {
        step++;
        if (monitor_btn.hasClass('active')) {
            switch_active(monitor_btn, analyze_btn);
        } else if (analyze_btn.hasClass('active')) {
            switch_active(analyze_btn, plan_btn);
        } else if (plan_btn.hasClass('active')) {
            switch_active(plan_btn, execute_btn);
        } else if (execute_btn.hasClass('active')) {
            switch_active(execute_btn, monitor_btn);
        }
    }

    function next() {
        if (monitor_btn.hasClass('active')) {
            return analyze();
        } else if (analyze_btn.hasClass('active')) {
            return plan();
        } else if (plan_btn.hasClass('active')) {
            return execute();
        } else if (execute_btn.hasClass('active')) {
            return monitor();
        } else {
            return new Promise((resolve) => resolve(false));
        }
    }

    function play() {
        if (! paused && ! stopped) {
            // TODO: automatic inc-step
        }
    }

    socket.on('connect', () => {
        console.log('>>> connected!');
    });

    socket.on('disconnect', () => {
        console.log('>>> disconnected!');
    });

    function hitPlay() {
        if (step == 0 && ! paused && stopped) {
            start().then((success) => {
                if (! success) {
                    return;
                }
                play_or_pause_btn.toggleClass('btn-outline-success');
                play_or_pause_btn.toggleClass('btn-outline-warning');
                play_or_pause_btn.html($('<span class="oi oi-media-pause"></span>'));
                if (! monitor_btn.hasClass('active')) {
                    switch_active(null, monitor_btn);
                }
                stop_btn.prop('disabled', () => false);
                forward_btn.prop('disabled', () => false);
                stopped = false;
                play();
            });
        } else {
            play_or_pause_btn.toggleClass('btn-outline-primary');
            play_or_pause_btn.toggleClass('btn-outline-warning');
            play_or_pause_btn.html($('<span class="oi oi-media-pause"></span>'));
            paused = false;
            play();
        }
    }

    function hitPause() {
        play_or_pause_btn.toggleClass('btn-outline-warning');
        play_or_pause_btn.toggleClass('btn-outline-primary');
        play_or_pause_btn.html($('<span class="oi oi-media-play"></span>'));
        paused = true;
    }

    function hitStop() {
        stop().then((success) => {
            if (! success) {
                return;
            }
            if (play_or_pause_btn.hasClass('btn-outline-warning')) {
                play_or_pause_btn.toggleClass('btn-outline-warning');
                play_or_pause_btn.toggleClass('btn-outline-success');
                play_or_pause_btn.html($('<span class="oi oi-media-play"></span>'));
            } else if (play_or_pause_btn.hasClass('btn-outline-primary')) {
                play_or_pause_btn.toggleClass('btn-outline-primary');
                play_or_pause_btn.toggleClass('btn-outline-success');
            }
            if (monitor_btn.hasClass('active')) {
                switch_active(monitor_btn, null);
            } else if (analyze_btn.hasClass('active')) {
                switch_active(analyze_btn, null);
            } else if (plan_btn.hasClass('active')) {
                switch_active(plan_btn, null);
            } else if (execute_btn.hasClass('active')) {
                switch_active(execute_btn, null);
            }
            stop_btn.prop('disabled', () => true);
            forward_btn.prop('disabled', () => true);
            step = 0;
            paused = false;
            stopped = true;
        });
    }

    function hitForward() {
        next().then((success) => {
            if (! success) {
                return;
            }
            incStep();
        });
    }

    play_or_pause_btn.click(() => {
        if (play_or_pause_btn.hasClass('btn-outline-success')) {
            hitPlay();
        } else if (play_or_pause_btn.hasClass('btn-outline-primary')) {
            hitPlay();
        } else {
            hitPause();
        }
    });

    stop_btn.click(() => hitStop());

    forward_btn.click(() => hitForward());

})();
