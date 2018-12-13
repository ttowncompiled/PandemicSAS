exports.execute = (plan, manager, reporter) => {
    let root = plan.root;
    let is_start = false;
    let did_outbreak = false;
    let game_lost = false;
    while (root) {
        if (root.action === 'Start') {
            is_start = true;
        } else if (root.action === 'Draw Infect Card') {
            manager.drawInfectCard(reporter);
        } else if (root.action === 'Infect City') {
            let pair = manager.infectCity(reporter);
            if (pair[0]) {
                did_outbreak = true;
            } else if (pair[1]) {
                game_lost = true;
            }
        } else if (root.action === 'Deal Player Card') {
            let rv = manager.dealPlayerCard(is_start, reporter);
            if (rv) {
                game_lost = true;
            }
        } else if (root.action === 'Yield') {
            manager.envYield(is_start, reporter);
        }
        if (root.links && root.links.length > 0) {
            root = root.links[0];
        } else {
            root = null;
        }
    }
    return [ did_outbreak, game_lost ];
};
