// const vis

let gameInit = null;
let gameUpdate = null;
let gameClear = null;

(() => {
    let board = document.getElementById('board');

    let nodes = new vis.DataSet([]);
    let edges = new vis.DataSet([]);
    let data = {
        nodes: nodes,
        edges: edges
    };

    gameInit = (game) => {
        initLookup();
        initCities(game.cities);
        initPawns(game.pawns);
    }

    gameUpdate = (game) => {

    }

    gameClear = () => {
        nodes.clear();
        edges.clear();
        initLookup();
    }

    let lookup = null;

    function initLookup() {
        let map = {};
        let vis_id = 1;
        lookup = (lookup_id) => {
            if (! (lookup_id in map)) {
                map[lookup_id] = vis_id;
                vis_id++;
            }
            return map[lookup_id];
        };
    }

    function nodeId(node) {
        return node.name;
    }

    function edgeId(from, to) {
        if (from.name <= to.name) {
            return `${nodeId(from)}:${nodeId(to)}`;
        } else {
            return `${nodeId(to)}:${nodeId(from)}`;
        }
    }

    function initCities(cities) {
        let names = Object.keys(cities);
        for (let i = 0; i < names.length; i++) {
            let city = cities[names[i]];
            addCity(city);
        }
        let filter = {};
        for (let i = 0; i < names.length; i++) {
            let city = cities[names[i]];
            if (! (city.name in filter)) {
                filter[city.name] = true;
            }
            for (let j = 0; j < city.neighbors.length; j++) {
                let neighbor = cities[city.neighbors[j]];
                if (neighbor.name in filter) {
                    continue;
                }
                connectCities(city, neighbor);
            }
        }
    }

    function initPawns(pawns) {
        for (let i = 0; i < pawns.length; i++) {
            addPawn(pawns[i]);
        }
    }

    function addCity(city) {
        setTimeout(() => {
            nodes.add({
                id: lookup(nodeId(city)),
                label: city.name,
                color: city.color.toLowerCase(),
                font: {
                    color: 'cyan',
                },
            });
        }, 0);
    }

    function connectCities(from_city, to_city) {
        setTimeout(() => {
            edges.add({
                id: lookup(edgeId(from_city, to_city)),
                from: lookup(nodeId(from_city)),
                to: lookup(nodeId(to_city)),
                color: {
                    highlight: 'black',
                },
            });
        }, 0);
    }

    function addPawn(pawn) {
        setTimeout(() => {
            nodes.add({
                id: lookup(nodeId(pawn)),
                label: pawn.name,
                color: pawn.color,
                font: {
                    color: 'cyan',
                },
            });
            edges.add({
                id: lookup(edgeId(pawn, pawn.location)),
                from: lookup(nodeId(pawn)),
                to: lookup(nodeId(pawn.location)),
                color: {
                    highlight: 'black',
                },
            });
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
    };

    let board_network = new vis.Network(board, data, options);
})();
