exports.execute = (plan, manager) => {
    let root = plan.root;
    while (root) {
        if (root.action === 'Drive / Ferry') {
            manager.drivePawn(root.location);
        } else if (root.action === 'Treat Disease') {
            manager.treatDisease(root.location);
        } else if (root.action === 'Yield') {
            manager.sysYield();
        }
        if (root.links && root.links.length > 0) {
            root = root.links[0];
        } else {
            root = null;
        }
    }
    return {};
};
