exports.analysis = (probe, adapting=false, needs_to_fly=false, wait_to_cure=false) => {
    initLookup();
    let tree = {};
    tree.root = {
        id: lookup(),
        name: 'root',
        action: 'root',
        location: '',
        links: [],
    };
    let can_cure = selectStrategyAndBranchOut(probe, tree.root, adapting, needs_to_fly, wait_to_cure);
    if (tree.root.links.length === 0) {
        return [ tree, false, can_cure ];
    } else {
        return [ tree, true, can_cure ];
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

function selectStrategyAndBranchOut(probe, root, adapting, needs_to_fly, wait_to_cure) {
    let state = {
        location: probe.pawns[probe.pawn.id-1].location.name,
        hand: probe.pawns[probe.pawn.id-1].hand.map((card) => card.name),
        cities: {},
    };

    let filter = {};
    filter[state.location] = true;

    let can_cure = false;
    let curable_disease = '';

    let colors = {};
    probe.pawns[probe.pawn.id-1].hand.forEach((card) => {
        if (card.color === 'Blank') {
            return;
        }
        if (! (card.color in colors)) {
            colors[card.color] = 1;
        } else {
            colors[card.color] += 1;
        }
    });
    Object.keys(colors).forEach((key) => {
        let count = colors[key];
        if (count >= 4) {
            can_cure = true;
            curable_disease = key;
        }
    });

    if (can_cure) {
        IMustCureDisease(probe, state, curable_disease, root, 0, filter);
        if (! adapting && ! wait_to_cure) {
            return can_cure;
        }
    }

    if (adapting || needs_to_fly) {
        INeedToTreatInfections(probe, state, root, 0, filter);
    } else {
        IOnlyNeedToDriveToTreatInfection(probe, state, root, 0, filter);
    }

    return can_cure;
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

function IMustCureDisease(probe, state, color, root, depth, filter) {
    let cb = null;
    cb = (probe, state, root, depth, filter) => {
        if (depth >= 4) {
            let [action, ok] = branchYield();
            root.links.push(action);
            return [root, false];
        }
        if (probe.research_stations.includes(state.location)) {
            let [action, _] = branchCureDisease(color);
            root.links.push(action);
            let [yield, ok] = branchYield();
            action.links.push(yield);
            return [root, true];
        }
        let close_neighbors = probe.cities[state.location].neighbors;
        for (let i = 0; i < close_neighbors.length; i++) {
            let neighbor = close_neighbors[i];
            if (neighbor in filter) {
                continue;
            }
            let [action, ok] = branchDrive(probe, state, neighbor,
                    depth, filter, cb);
            root.links.push(action);
        }
        return [root, true];
    };
    return cb(probe, state, root, depth, filter);
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
    let ok = true;

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

function branchCureDisease(color) {
    let action = {
        id: lookup(),
        name: `Cure Disease - ${color}`,
        action: 'Cure Disease',
        location: '',
        disease: color,
        links: [],
    };
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
