// const io, nodes, edges;

function start() {

}

function play() {

}

function pause() {

}

function stop() {

}

function next() {

}

function back() {

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

(() => {

    const backward_btn          = $('#backward');
    const play_or_pause_btn     = $('#play-pause');
    const stop_btn              = $('#stop');
    const forward_btn           = $('#forward');

    let step = 0;

    function hit_play() {
        play_or_pause_btn.toggleClass('btn-outline-warning');
        play_or_pause_btn.toggleClass('btn-outline-success');
        play_or_pause_btn.html($('<span class="oi oi-media-pause"></span>'));
        if (step == 0) {
            if (stop_btn.hasClass('disabled')) {
                stop_btn.removeClass('disabled');
            }
            if (forward_btn.hasClass('disabled')) {
                forward_btn.removeClass('disabled');
            }
            start();
        } else {
            play();
        }
    }

    function hit_pause() {
        play_or_pause_btn.toggleClass('btn-outline-warning');
        play_or_pause_btn.toggleClass('btn-outline-success');
        play_or_pause_btn.html($('<span class="oi oi-media-play"></span>'));
        pause();
    }

    function hit_stop() {
        if (play_or_pause_btn.hasClass('btn-outline-warning')) {
            play_or_pause_btn.removeClass('btn-outline-warning');
            play_or_pause_btn.addClass('btn-outline-success');
            play_or_pause_btn.html($('<span class="oi oi-media-play"></span>'));
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
        stop();
    }

    function hit_forward() {
        if (step == 0 && backward_btn.hasClass('disabled')) {
            backward_btn.removeClass('disabled');
        }
        step++;
        next();
    }

    function hit_backward() {
        step--;
        if (step == 0 && ! backward_btn.hasClass('disabled')) {
            backward_btn.addClass('disabled');
        }
        back();
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

