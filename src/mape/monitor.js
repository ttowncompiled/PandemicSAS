exports.monitor = (game) => {
    let probe = {}
    probe.cities = game.cities;
    for (let i = 0; i < probe.cities.length; i++) {
        let city = probe.cities[i];
        let status = game.status[city.name];
        probe.cities[i].status = status;
    }
    probe.pawns = game.pawns;
    return probe;
};
