// const axios, nodes, edges;
(() => {

    const monitor_btn           = $('#monitor');
    const analyze_btn           = $('#analyze');
    const plan_btn              = $('#plan');
    const execute_btn           = $('#execute');

    const backward_btn          = $('#backward');
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
                    console.log(response);
                    resolve(true);
                })
                .catch((error) => {
                    console.log(error);
                    resolve(false);
                });
        });
    }

    function monitor() {
        return new Promise((resolve) => {
            axios.get('/monitor')
                .then((response) => {
                    console.log(response);
                    resolve(true);
                })
                .catch((error) => {
                    console.log(error);
                    resolve(false);
                });
        });
    }

    function analyze() {
        return new Promise((resolve) => {
            axios.get('/analyze')
                .then((response) => {
                    console.log(response);
                    resolve(true);
                })
                .catch((error) => {
                    console.log(error);
                    resolve(false);
                });
        });
    }

    function plan() {
        return new Promise((resolve) => {
            axios.get('/plan')
                .then((response) => {
                    console.log(response);
                    resolve(true);
                })
                .catch((error) => {
                    console.log(error);
                    resolve(false);
                });
        });
    }

    function execute() {
        return new Promise((resolve) => {
            axios.get('/execute')
                .then((response) => {
                    console.log(response);
                    resolve(true);
                })
                .catch((error) => {
                    console.log(error);
                    resolve(false);
                });
        });
    }

    function play() {
        return new Promise((resolve) => {
            resolve(true);
        });
    }

    function pause() {
        return new Promise((resolve) => {
            resolve(true);
        });
    }

    function stop() {
        return new Promise((resolve) => {
            axios.get('/stop')
                .then((response) => {
                    console.log(response);
                    resolve(true);
                })
                .catch((error) => {
                    console.log(error);
                    resolve(false);
                });
        });
    }

    function next() {
        return new Promise((resolve) => {
            axios.get('/next')
                .then((response) => {
                    console.log(response);
                    resolve(true);
                })
                .catch((error) => {
                    console.log(error);
                    resolve(false);
                });
        });
    }

    function back() {
        return new Promise((resolve) => {
            axios.get('/back')
                .then((response) => {
                    console.log(response);
                    resolve(true);
                })
                .catch((error) => {
                    console.log(error);
                    resolve(false);
                });
        });
    }

    function add(from_id, to_id, node_label, edge_id, edge_label) {
        edges.add({
            id: edge_id,
            from: from_id,
            to: to_id,
            label: edge_Label,
        });
        nodes.add({
            id: to_id,
            label: node_label,
        });
    }

    function remove(edge_id, node_id) {
        nodes.remove(node_id);
        edges.remove(edge_id);
    }

    function clear() {
        nodes.clear();
        edges.clear();
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

    function hit_play() {
        if (step == 0) {
            start().then((success) => {
                if (! success) {
                    return;
                }
                play_or_pause_btn.toggleClass('btn-outline-warning');
                play_or_pause_btn.toggleClass('btn-outline-success');
                play_or_pause_btn.html($('<span class="oi oi-media-pause"></span>'));
                if (! monitor_btn.hasClass('active')) {
                    switch_active(null, monitor_btn);
                }
                if (stop_btn.hasClass('disabled')) {
                    stop_btn.removeClass('disabled');
                }
                if (forward_btn.hasClass('disabled')) {
                    forward_btn.removeClass('disabled');
                }
            });
        } else {
            play().then((success) => {
                if (! success) {
                    return;
                }
                play_or_pause_btn.toggleClass('btn-outline-warning');
                play_or_pause_btn.toggleClass('btn-outline-success');
                play_or_pause_btn.html($('<span class="oi oi-media-pause"></span>'));
            });
        }
    }

    function hit_pause() {
        pause().then((success) => {
            if (! success) {
                return;
            }
            play_or_pause_btn.toggleClass('btn-outline-warning');
            play_or_pause_btn.toggleClass('btn-outline-success');
            play_or_pause_btn.html($('<span class="oi oi-media-play"></span>'));
        });
    }

    function hit_stop() {
        stop().then((success) => {
            if (! success) {
                return;
            }
            if (play_or_pause_btn.hasClass('btn-outline-warning')) {
                play_or_pause_btn.removeClass('btn-outline-warning');
                play_or_pause_btn.addClass('btn-outline-success');
                play_or_pause_btn.html($('<span class="oi oi-media-play"></span>'));
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
            if (! stop_btn.hasClass('disabled')) {
                stop_btn.addClass('disabled');
            }
            if (! backward_btn.hasClass('disabled')) {
                backward_btn.addClass('disabled');
            }
            if (! forward_btn.hasClass('disabled')) {
                forward_btn.addClass('disabled');
            }
            step = 0;
        });
    }

    function hit_forward() {
        next().then((success) => {
            if (! success) {
                return;
            }
            if (step == 0 && backward_btn.hasClass('disabled')) {
                backward_btn.removeClass('disabled');
            }
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
        });
    }

    function hit_backward() {
        back().then((success) => {
            if (! success) {
                return;
            }
            step--;
            if (step == 0 && ! backward_btn.hasClass('disabled')) {
                backward_btn.addClass('disabled');
            }
            if (monitor_btn.hasClass('active')) {
                switch_active(monitor_btn, execute_btn);
            } else if (analyze_btn.hasClass('active')) {
                switch_active(analyze_btn, monitor_btn);
            } else if (plan_btn.hasClass('active')) {
                switch_active(plan_btn, analyze_btn);
            } else if (execute_btn.hasClass('active')) {
                switch_active(execute_btn, plan_btn);
            }
        });
    }

    play_or_pause_btn.click(() => {
        if (play_or_pause_btn.hasClass('btn-outline-success')) {
            hit_play();
        } else {
            hit_pause();
        }
    });

    stop_btn.click(() => hit_stop());

    forward_btn.click(() => hit_forward());

    backward_btn.click(() => hit_backward());

})();

