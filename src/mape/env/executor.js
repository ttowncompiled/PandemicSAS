exports.execute = (plan, manager) => {
    let root = plan.root;
    while (root) {
        if (root.name === 'Draw Infect Card') {

        } else if (root.name === 'Infect City') {

        } else if (root.name === 'Deal Player Card') {

        } else if (root.name === 'Yield') {

        }
        if (root.links && root.links.length > 0) {
            root = root.links[0];
        } else {
            root = null;
        }
    }
    return {};
};
