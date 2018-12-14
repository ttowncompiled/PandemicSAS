exports.plan = (probe, analysis, can_cure, adapting=false) => {
    let tree = null;
    if (can_cure) {
        tree = planBestCurePath(probe, analysis);
    } else {
        tree = planBestTreatPath(probe, analysis);
    }

    let needs_to_fly = false;

    if (adapting) {
        let root = tree.root;
        while (root !== null) {
            if (root.action === 'Direct Flight') {
                needs_to_fly = true;
            }
            if (root.links.length === 0) {
                root = null;
                continue;
            }
            root = root.links[0];
        }
    }

    return [ tree, needs_to_fly ];
};

function planBestTreatPath(probe, analysis) {
    let status = {};
    Object.keys(probe.cities)
        .map((key) => probe.cities[key])
        .forEach((city) => {
            status[city.name] = Object.assign({}, city.status);
        });

    let best_weight = -1;
    let best_path = [];

    let stack = [ analysis.root ];
    let direction = [ 0 ];

    while (stack.length > 0) {
        let node = stack[stack.length - 1];
        let link = direction.pop();

        if (node.links.length === 0) {
            let weight = 0;
            for (let i = 0; i < stack.length; i++) {
                if (stack[i].action === 'Treat Disease') {
                    let max_infection = Math.max(...Object.keys(status[stack[i].location]).map((key) => status[stack[i].location][key]));
                    if (max_infection === 3) {
                        weight += 2;
                    } else {
                        weight += 1;
                    }
                }
            }
            if (best_weight < weight) {
                best_weight = weight;
                best_path = stack.slice(0);
            }

            stack.pop();
            continue;
        }

        if (link === node.links.length) {
            stack.pop();
            continue;
        }

        direction.push(link+1);

        stack.push(node.links[link]);
        direction.push(0);
    }

    for (let i = 0; i < best_path.length; i++) {
        let node = best_path[i];
        node = Object.assign({}, node);
        node.links = [];
        best_path[i] = node;
    }

    for (let i = best_path.length-1; i > 0; i--) {
        best_path[i-1].links.push(best_path[i]);
    }

    let tree = {};
    tree.root = best_path[0];

    return tree;
};

function planBestCurePath(probe, analysis) {
    let weights = {};
    Object.keys(probe.cities).map((key) => probe.cities[key]).forEach((city) => {
        weights[city.name] = -100;
    });

    probe.research_stations.forEach((station) => {
        weights[station] = 0;

        let filter = {};
        filter[station] = true;

        let q1 = probe.cities[station].neighbors;
        let count = -1;
        while (q1.length > 0) {
            let q2 = [];
            while (q1.length > 0) {
                let name = q1.splice(0, 1);
                let city = probe.cities[name];
                if (city.name in filter) {
                    continue;
                }
                if (weights[city.name] < count) {
                    weights[city.name] = count;
                }
                filter[city.name] = true;
                q2 = q2.concat(city.neighbors);
            }
            if (q2.length > 0) {
                q1 = q2;
                count--;
            } else {
                q1 = [];
            }
        }
    });

    let best_weight = -100;
    let best_path = [];

    let stack = [ analysis.root ];
    let direction = [ 0 ];

    while (stack.length > 0) {
        let node = stack[stack.length - 1];
        let link = direction.pop();

        if (node.links.length === 0) {
            let weight = -100;
            if (stack[stack.length - 2].action === 'Cure Disease') {
                weight = 10;
            } else {
                weight = weights[stack[stack.length - 2].location];
            }
            if (best_weight < weight) {
                best_weight = weight;
                best_path = stack.slice(0);
            }

            stack.pop();
            continue;
        }

        if (link === node.links.length) {
            stack.pop();
            continue;
        }

        direction.push(link+1);

        stack.push(node.links[link]);
        direction.push(0);
    }

    for (let i = 0; i < best_path.length; i++) {
        let node = best_path[i];
        node = Object.assign({}, node);
        node.links = [];
        best_path[i] = node;
    }

    for (let i = best_path.length-1; i > 0; i--) {
        best_path[i-1].links.push(best_path[i]);
    }

    let tree = {};
    tree.root = best_path[0];

    return tree;
};
