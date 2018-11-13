exports.analysis = (_model, probe) => {
    initLookup();
    let tree = {};
    tree.root = {
        id: lookup(),
        name: 'root',
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
}

function branchActions(probe, root) {
    branchStartAction(probe, root);
};

function branchStartAction(probe, root) {
    if (probe.round !== 1) {
        return;
    }
    let action = {
        id: lookup(),
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
        id: lookup(),
        name: 'Draw Infect Card',
        links: [],
    };
    root.links.push(action);
    return action;
};

function branchInfectCity(probe, root) {
    let action = {
        id: lookup(),
        name: 'Infect City',
        links: [],
    };
    root.links.push(action);
    return action;
};

function branchDealPlayerCard(probe, root) {
    let action = {
        id: lookup(),
        name: 'Deal Player Card',
        links: [],
    };
    root.links.push(action);
    return action;
};

function branchYield(probe, root) {
    let action = {
        id: lookup(),
        name: 'Yield',
        links: [],
    };
    root.links.push(action);
    return action;
};
