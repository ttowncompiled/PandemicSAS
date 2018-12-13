exports.analysis = (probe, adapting) => {
    initLookup();
    let tree = {};
    tree.root = {
        id: lookup(),
        name: 'root',
        action: 'root',
        location: '',
        links: [],
    };
    selectStrategyAndBranchOut(probe, tree.root, adapting);
    if (tree.root.links.length === 0) {
        return [ tree, false ];
    } else {
        let root = tree.root;
        while (root !== null) {
            if (root.links.length === 0) {
                root = null;
                continue;
            }
            if (root.action === 'Direct Flight') {
                needs_to_fly = true;
            }
            root = root.links[0];
        }
        return [ tree, true ];
    }
};

let lookup = null;

function initLookup() {
    let node_id = -1;
    lookup = () => {
        node_id++;
        return node_id;
    };
};

let needs_to_fly = false;

function selectStrategyAndBranchOut(probe, root, needs_to_adapt_travel=false) {
    let state = {
        location: probe.pawns[probe.pawn.id-1].location.name,
        hand: probe.pawns[probe.pawn.id-1].hand.map((card) => card.name),
        cities: {},
    };

    let filter = {};
    filter[state.location] = true;

    if (probe.outbreaks > 0) {
        for (let i = 0; i < probe.outbreaks; i++) {
            let city = probe.cities[probe.outbreak_locations[i]];
            for (let key in city.status) {
                if (city.status[key] === 3) {
                    needs_to_adapt_travel = true;
                }
            }
        }
    }

    if (needs_to_adapt_travel || needs_to_fly) {
        INeedToTreatInfections(probe, state, root, 0, filter);
    } else {
        IOnlyNeedToDriveToTreatInfection(probe, state, root, 0, filter);
    }
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

function INeedToTreatInfections(probe, state, root, depth, filter) {
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

    let far_neighbors = state.hand.filter((name) => name !== 'Blank');
    for (let i = 0 ; i < far_neighbors.length; i++) {
        let neighbor = far_neighbors[i];
        if (neighbor in filter) {
            continue;
        }
        let [action, ok] = branchFlight(probe, state, neighbor,
                depth, filter, INeedToTreatInfections);
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
        action: 'Drive / Ferry',
        location: location,
        links: [],
    };

    state = Object.assign({}, state);
    state.location = location;

    filter = Object.assign({}, filter);
    filter[location] = true;

    return cb(probe, state, action, depth+1, filter);
};

function branchFlight(probe, state, location, depth, filter, cb) {
    let action = {
        id: lookup(),
        name: `Fly - ${location}`,
        action: 'Direct Flight',
        location: location,
        links: [],
    };

    state = Object.assign({}, state);
    state.location = location;
    state.hand = state.hand.slice(0);
    state.hand.splice(state.hand.indexOf(location), 1);

    filter = Object.assign({}, filter);
    filter[location] = true;

    return cb(probe, state, action, depth+1, filter);
};

function branchTreatInfection(probe, state, depth, filter, cb) {
    let location = state.location;

    let action = {
        id: lookup(),
        name: `Treat - ${location}`,
        action: 'Treat Disease',
        location: location,
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
        action: 'Yield',
        location: '',
        links: [],
    };
    return [action, false];
};
