exports.monitor = (model) => {
    let probe = {}
    probe.cities = model.cities();
    for (let i = 0; i < probe.cities.length; i++) {
        let city = probe.cities[i];
        let status = model.status()[city.name];
        probe.cities[i].status = status;
    }
    probe.pawns = model.pawns();
    for (let i = 0; i < probe.pawns.length; i++) {
        probe.pawns[i].hand = model.hands()[i];
    }
    probe.player = model.player();
    probe.round = model.round();
    probe.turn = model.turn();
    return probe;
};
