exports.analysis = (probe) => {
    initLookup();
    let tree = {};
    tree.root = {
        id: lookup(),
        name: 'root',
        links: [],
    };
    selectStrategyAndBranchOut(probe, tree.root);
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

function selectStrategyAndBranchOut(probe, root) {
    let state = {
        location: probe.pawns[probe.pawn-1].location.name,
        hand: probe.pawns[probe.pawn-1].hand.map((card) => card.name),
        cities: {},
    };

    let filter = {};
    filter[state.location] = true;

    IOnlyNeedToDriveToTreatInfection(probe, state, root, 0, filter);
};

function IOnlyNeedToDriveToTreatInfection(probe, state, root, depth, filter) {
    if (depth >= 4) {
        let [action, ok] = branchYield();
        root.links.push(action);
        return [root, false];
    }

    let keep_branch = false;

    let status = probe.cities[state.location].status;
    if (state.location in state.cities) {
        status = state.cities[state.location];
    }

    let infections = Object.keys(status)
        .map((key) => status[key])
        .filter((count) => count > 0);
    if (infections.length > 0) {
        let [action, ok] = branchTreatInfection(probe, state,
            depth, filter, IOnlyNeedToDriveToTreatInfection);
        root.links.push(action);
        keep_branch = true;
    }

    let close_neighbors = probe.cities[state.location].neighbors;
    for (let i = 0; i < close_neighbors.length; i++) {
        let neighbor = close_neighbors[i];
        if (neighbor in filter) {
            continue;
        }
        let [action, ok] = branchDrive(probe, state, neighbor,
                depth, filter, IOnlyNeedToDriveToTreatInfection);
        if (ok) {
            root.links.push(action);
            keep_branch = true;
        }
    }

    return [root, keep_branch];
};

function branchDrive(probe, state, location, depth, filter, cb) {
    let action = {
        id: lookup(),
        name: `Drive - ${location}`,
        links: [],
    };

    state = Object.assign({}, state);
    state.location = location;

    filter = Object.assign({}, filter);
    filter[location] = true;

    return cb(probe, state, action, depth+1, filter);
};

function branchTreatInfection(probe, state, depth, filter, cb) {
    let location = state.location;

    let action = {
        id: lookup(),
        name: `Treat - ${location}`,
        links: [],
    };

    state = Object.assign({}, state);
    state.cities = Object.assign({}, state.cities);
    if (! (location in state.cities)) {
        state.cities[location] = probe.cities[location].status;
    }
    state.cities[location] = Object.assign({}, state.cities[location]);

    let max_key = '';
    for (let key in state.cities[location]) {
        if (max_key === '' || state.cities[location][max_key] < state.cities[location][key]) {
            max_key = key;
        }
    }
    state.cities[location][max_key]--;

    [action, ok] = cb(probe, state, action, depth+1, filter);
    if (action.links.length === 0) {
        let [link, ok] = branchYield();
        action.links.push(link);
    }

    return [action, true];
};

function branchYield() {
    let action = {
        id: lookup(),
        name: 'Yield',
        links: [],
    };
    return [action, false];
};
