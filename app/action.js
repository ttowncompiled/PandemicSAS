// const vis

let actionInit = null;
let actionUpdate = null;
let actionClear = null;

(() => {
    let action = document.getElementById('action');

    let lookup = {};
    let vis_id = 1;

    let nodes = new vis.DataSet([]);
    let edges = new vis.DataSet([]);
    let data = {
        nodes: nodes,
        edges: edges
    };

    actionInit = (tree) => {
        console.log(tree);
        actionClear();
    }

    actionUpdate = (tree) => {
        console.log(tree);
    }

    actionClear = () => {
        nodes.clear();
        edges.clear();
        lookup = {};
        vis_id = 1;
    }

    function edgeLookup(from, to) {
        let key = `${from.name}:${to.name}`;
        if (key in lookup) {
            return lookup[key];
        }
        key = `${to.name}:${from.name}`;
        if (key in lookup) {
            return lookup[key];
        }
        return null;
    }

    function edgeInLookup(from_city, to_city) {
        return edgeLookup(from_city, to_city) !== null;
    }

    let locales = {
        en: {
            edit: 'Edit',
            del: 'Delete selected',
            back: 'Back',
            addNode: 'Add Node',
            addEdge: 'Add Edge',
            editNode: 'Edit Node',
            editEdge: 'Edit Edge',
            addDescription: 'Click in an empty space to place a new node.',
            edgeDescription: 'Click on a node and drag the edge to another node to connect them.',
            editEdgeDescription: 'Click on the control points and drag them to a node to connect to it.',
            createEdgeError: 'Cannot link edges to a cluster.',
            deleteClusterError: 'Clusters cannot be deleted.',
            editClusterError: 'Clusters cannot be edited.'
        }
    }

    let options = {
        autoResize: true,
        height: '100%',
        width: '100%',
        locale: 'en',
        locales: locales,
        clickToUse: false,
    };

    let action_network = new vis.Network(action, data, options);
})();
