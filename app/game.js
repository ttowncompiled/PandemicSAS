// const vis
let board = document.getElementById('board');

let lookup = {};
let vis_id = 1;

let nodes = null;
let edges = null;

function gameStart(game) {
    console.log(game);
    initCities(game.cities);
    initPawns(game.pawns);
}

function gameUpdate(game) {
    console.log(game);
}

function gameClear() {
    nodes.clear();
    edges.clear();
    lookup = {};
    vis_id = 1;
}

function edgeLookup(from_city, to_city) {
    let key = `${from_city.name}:${to_city.name}`;
    if (key in lookup) {
        return lookup[key];
    }
    key = `${to_city.name}:${from_city.name}`;
    if (key in lookup) {
        return lookup[key];
    }
    return null;
}

function edgeInLookup(from_city, to_city) {
    return edgeLookup(from_city, to_city) !== null;
}

function initCities(cities) {
    let names = Object.keys(cities);
    for (let i = 0; i < names.length; i++) {
        let city = cities[names[i]];
        if (! (city.name in lookup)) {
            addCity(city);
        }
        for (let j = 0; j < city.neighbors.length; j++) {
            let neighbor = cities[city.neighbors[j]];
            if (! (neighbor.name in lookup)) {
                addCity(city);
            }
            if (! edgeInLookup(city, neighbor)) {
                connectCities(city, neighbor);
            }
        }
    }
}

function initPawns(pawns) {
    for (let i = 0; i < pawns.length; i++) {
        let pawn = pawns[i];
        pawn.name = `${i}`;
        if (i === 0) {
            pawn.color = 'orange';
        } else {
            pawn.color = 'green';
        }
        addPawn(pawn);
    }
}

function addCity(city) {
    if (! (city.name in lookup)) {
        lookup[city.name] = vis_id;
        vis_id++;
        setTimeout(() => {
            nodes.add({
                id: lookup[city.name],
                label: city.name,
                color: city.color.toLowerCase(),
                font: {
                    color: 'cyan',
                },
            });
        }, 0);
    }
}

function connectCities(from_city, to_city) {
    if (! edgeInLookup(from_city, to_city)) {
        let key = `${from_city.name}:${to_city.name}`;
        lookup[key] = vis_id;
        vis_id++;
        setTimeout(() => {
            edges.add({
                id: lookup[key],
                from: lookup[from_city.name],
                to: lookup[to_city.name],
                color: {
                    highlight: 'black',
                },
            });
        }, 0);
    }
}

function addPawn(pawn) {
    if (! (pawn.name in lookup)) {
        lookup[pawn.name] = vis_id;
        vis_id++;
        let key = `${pawn.name}:location`;
        lookup[key] = vis_id;
        vis_id++;
        setTimeout(() => {
            nodes.add({
                id: lookup[pawn.name],
                label: pawn.name,
                color: pawn.color,
                font: {
                    color: 'cyan',
                },
            });
            edges.add({
                id: lookup[key],
                from: lookup[pawn.name],
                to: lookup[pawn.location],
                color: {
                    highlight: 'black',
                },
            });
        }, 0);
    }
}

(() => {

    // create an array with nodes
    nodes = new vis.DataSet([]);

    // create an array with edges
    edges = new vis.DataSet([]);

    // provide the data in the vis format
    let data = {
        nodes: nodes,
        edges: edges
    };

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

    // initialize your network!
    let board_network = new vis.Network(board, data, options);
})();
