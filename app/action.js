// const vis

let actionInit = null;
let actionUpdate = null;
let actionClear = null;

(() => {
    let action = document.getElementById('action');

    let nodes = new vis.DataSet([]);
    let edges = new vis.DataSet([]);
    let data = {
        nodes: nodes,
        edges: edges
    };

    actionInit = (tree) => {
        console.log(tree);
        initLookup();
        actionClear();
        initTree(tree.root);
    }

    actionUpdate = (tree) => {
        console.log(tree);
    }

    actionClear = () => {
        nodes.clear();
        edges.clear();
        initLookup();
    }

    let lookup = null;

    function initLookup() {
        let vis_id = 0;
        lookup = () => {
            vis_id++;
            return vis_id;
        };
    }

    function initTree(root) {
        let root_id = addAction(root);
        for (let i = 0; i < root.links.length; i++) {
            let link = root.links[i];
            let link_id = initTree(link);
            connectActions(root_id, link_id);
        }
        return root_id;
    }

    function addAction(root) {
        let node_id = lookup();
        setTimeout(() => {
            nodes.add({
                id: node_id,
                label: root.name,
            });
        }, 0);
        return node_id;
    }

    function connectActions(root_id, link_id) {
        let edge_id = lookup();
        setTimeout(() => {
            edges.add({
                id: edge_id,
                from: root_id,
                to: link_id,
                arrows: 'to',
            });
        }, 0);
        return edge_id;
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
        layout: {
            hierarchical: {
                direction: 'UD',
            },
        },
    };

    let action_network = new vis.Network(action, data, options);
})();
