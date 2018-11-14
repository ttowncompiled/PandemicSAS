exports.analysis = (probe) => {
    initLookup();
    let tree = {};
    tree.root = {
        id: lookup(),
        name: 'root',
        action: 'root',
        links: [],
    };
    branchActions(probe, tree.root);
    return tree;
};

let lookup = null;

function initLookup() {
    let node_id = -1;
    lookup = () => {
        node_id++;
        return node_id;
    };
};

function branchActions(probe, root) {
    if (probe.round <= 1) {
        branchStartAction(probe, root);
    }
};

function branchStartAction(probe, root) {
    let action = {
        id: lookup(),
        name: 'Start',
        action: 'Start',
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

function branchDrawInfectCard(_, root) {
    let action = {
        id: lookup(),
        name: 'Draw Infect Card',
        action: 'Draw Infect Card',
        links: [],
    };
    root.links.push(action);
    return action;
};

function branchInfectCity(_, root) {
    let action = {
        id: lookup(),
        name: 'Infect City',
        action: 'Infect City',
        links: [],
    };
    root.links.push(action);
    return action;
};

function branchDealPlayerCard(_, root) {
    let action = {
        id: lookup(),
        name: 'Deal Player Card',
        action: 'Deal Player Card',
        links: [],
    };
    root.links.push(action);
    return action;
};

function branchYield(_, root) {
    let action = {
        id: lookup(),
        name: 'Yield',
        action: 'Yield',
        links: [],
    };
    root.links.push(action);
    return action;
};
