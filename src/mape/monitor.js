exports.monitor = (model) => {
    let probe = {};
    probe.curable_diseases = model.curableDiseases();
    probe.cured_diseases = model.curedDiseases();
    probe.eradicable_diseases = model.eradicableDiseases();
    probe.eradicated_diseases = model.eradicatedDiseases();
    probe.cities = model.cities();
    for (let i = 0; i < probe.cities.length; i++) {
        let city = probe.cities[i];
        let status = model.status()[city.name];
        probe.cities[i].status = status;
    }
    probe.pawns = model.pawns();
    for (let i = 0; i < probe.pawns.length; i++) {
        let pawn = probe.pawns[i];
        pawn.hand = model.hands()[i];
        pawn.location.color = model.cities()[pawn.location.name].color;
    }
    probe.research_stations = model.stations();
    probe.infect_discards = model.infectPile();
    probe.player_discards = model.playerPile();
    probe.player = model.activePlayer();
    probe.pawn = model.activePawn();
    probe.infection_rate = model.infectionRate();
    probe.max_outbreaks = model.maxOutbreaks();
    probe.outbreaks = model.outbreaks();
    probe.max_rounds = model.maxRounds();
    probe.round = model.round();
    probe.turn = model.turn();
    return probe;
};
