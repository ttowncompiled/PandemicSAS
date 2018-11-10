exports.analysis = (probe) => {
    let tree = {};
    tree.root = {
        name: 'root',
        links: [],
    };
    branchActions(probe, tree.root);
    return tree;
};

function branchActions(probe, root) {
    branchStartAction(probe, root);
};

function branchStartAction(probe, root) {
    if (probe.round !== 1) {
        return;
    }
    let action = {
        name: 'Start',
        links: [],
    };
    root.links.push(action);
    for (let i = 0; i < 3; i++) {
        action = branchDrawInfectCard(probe, action);
        for (let j = 0; j < 3; j++) {
            action = branchInfectCity(probe, action);
        }
    }
    for (let i = 0; i < 3; i++) {
        action = branchDrawInfectCard(probe, action);
        for (let j = 0; j < 2; j++) {
            action = branchInfectCity(probe, action);
        }
    }
    for (let i = 0; i < 3; i++) {
        action = branchDrawInfectCard(probe, action);
        action = branchInfectCity(probe, action);
    }
    for (let i = 0; i < 8; i++) {
        action = branchDealPlayerCard(probe, action);
    }
    action = branchYield(probe, action);
    return action;
};

function branchDrawInfectCard(probe, root) {
    let action = {
        name: 'Draw Infect Card',
        links: [],
    };
    root.links.push(action);
    return action;
};

function branchInfectCity(probe, root) {
    let action = {
        name: 'Infect City',
        links: [],
    };
    root.links.push(action);
    return action;
};

function branchDealPlayerCard(probe, root) {
    let action = {
        name: 'Deal Player Card',
        links: [],
    };
    root.links.push(action);
    return action;
};

function branchYield(probe, root) {
    let action = {
        name: 'Yield',
        links: [],
    };
    root.links.push(action);
    return action;
};
