exports.execute = (plan, manager) => {
    let root = plan.root;
    let is_start = false;
    while (root) {
        if (root.action === 'Start') {
            is_start = true;
        } else if (root.action === 'Draw Infect Card') {
            manager.drawInfectCard();
        } else if (root.action === 'Infect City') {
            manager.infectCity();
        } else if (root.action === 'Deal Player Card') {
            manager.dealPlayerCard(is_start);
        } else if (root.action === 'Yield') {
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
