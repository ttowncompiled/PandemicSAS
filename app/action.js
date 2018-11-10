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
        updateTree(tree.root);
    }

    actionClear = () => {
        nodes.clear();
        edges.clear();
        initLookup();
    }

    let lookup = null;

    function initLookup() {
        let map = {};
        let vis_id = 0;
        lookup = (lookup_id) => {
            if (! (lookup_id in map)) {
                vis_id++;
                map[lookup_id] = vis_id;
            }
            return map[lookup_id];
        };
    }

    function nodeId(node) {
        return node.id;
    }

    function edgeId(from, to) {
        return `${nodeId(from)}:${nodeId(to)}`;
    }

    function initTree(root) {
        addAction(root);
        for (let i = 0; i < root.links.length; i++) {
            let link = root.links[i];
            initTree(link);
            connectActions(root, link);
        }
    }

    function updateTree(root) {
        pickAction(root);
        for (let i = 0; i < root.links.length; i++) {
            let link = root.links[i];
            updateTree(link);
        }
    }

    function addAction(root) {
        setTimeout(() => {
            nodes.add({
                id: lookup(nodeId(root)),
                label: root.name,
            });
        }, 0);
    }

    function connectActions(root, link) {
        setTimeout(() => {
            edges.add({
                id: lookup(edgeId(root, link)),
                from: lookup(nodeId(root)),
                to: lookup(nodeId(link)),
                arrows: 'to',
            });
        }, 0);
    }

    function pickAction(root) {
        setTimeout(() => {
            nodes.update({
                id: lookup(nodeId(root)),
                color: 'black',
                font: {
                    color: 'cyan',
                },
            })
        }, 0);
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
