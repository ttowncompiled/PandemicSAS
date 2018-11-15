exports.plan = (probe, analysis) => {
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
