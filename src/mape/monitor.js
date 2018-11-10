exports.monitor = (game) => {
    let probe = {}
    probe.cities = game.cities();
    for (let i = 0; i < probe.cities.length; i++) {
        let city = probe.cities[i];
        let status = game.status()[city.name];
        probe.cities[i].status = status;
    }
    probe.pawns = game.pawns();
    for (let i = 0; i < probe.pawns.length; i++) {
        probe.pawns[i].hand = game.hands()[i];
    }
    probe.player = game.player();
    probe.round = game.round();
    probe.turn = game.turn();
    return probe;
};
