exports.execute = (plan, manager) => {
    let root = plan.root;
    let is_start = false;
    while (root) {
        if (root.name === 'Start') {
            is_start = true;
        } else if (root.name === 'Draw Infect Card') {
            manager.drawInfectCard();
        } else if (root.name === 'Infect City') {
            manager.infectCity();
        } else if (root.name === 'Deal Player Card') {
            manager.dealPlayerCard(is_start);
        } else if (root.name === 'Yield') {
            manager.envYield(is_start);
        }
        if (root.links && root.links.length > 0) {
            root = root.links[0];
        } else {
            root = null;
        }
    }
    return {};
};
