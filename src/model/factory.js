exports.singletonGameFactory = (config) => {
    let model = {};
    model.curable = loadCurableDiseases(config);
    model.eradicable = loadEradicableDiseases(config);
    model.cities = loadCities(config);
    model.status = loadStatus(config);
    model.stations = loadResearchStations(config);
    model.infect_deck = loadInfectDeck(config);
    model.infect_pile = [];
    model.player_deck = loadPlayerDeckNoEpidemics(config);
    model.player_pile = [];
    model.epidemic_cards = loadEpidemicCards(config);
    model.pawns = loadPawns(config);
    model.hands = loadHands(config);
    model.player = 'env';
    model.pawn = 0;
    model.infection_rate_track = loadInfectionTrack();
    model.infection_rate = loadInfectionRate();
    model.max_outbreaks = loadMaxOutbreaks();
    model.outbreaks = loadInitOutbreaks();
    model.round = 1;
    model.turn = 1;
    return model;
};

function loadCurableDiseases(config) {
    let curable = {};
    for (let i = 0; i < config.curable.length; i++) {
        let disease = config.curable[i];
        curable[disease] = false;
    }
    return curable;
};

function loadEradicableDiseases(config) {
    let eradicable = {};
    for (let i = 0; i < config.eradicable.length; i++) {
        let disease = config.eradicable[i];
        eradicable[disease] = false;
    }
    return eradicable;
};

function loadCities(config) {
    let cities = {};
    for (let i = 0; i < config.cities.length; i++) {
        let city = config.cities[i];
        let status = {};
        for (let j = 0; j < config.diseases.length; j++) {
            status[config.diseases[j]] = 0;
        }
        city.status = status;
        cities[city.name] = city;
    }
    return cities;
};

function loadStatus(config) {
    let status = {};
    for (let i = 0; i < config.cities.length; i++) {
        let city_status = {};
        for (let j = 0; j < config.diseases.length; j++) {
            city_status[config.diseases[j]] = 0;
        }
        status[config.cities[i].name] = city_status;
    }
    return status;
};

function loadResearchStations(config) {
    return config.research_stations;
};

function loadInfectDeck(config) {
    let deck = [];
    for (let i = 0; i < config.cities.length; i++) {
        deck.push({
            name: config.cities[i].name,
            color: config.cities[i].color,
        });
    }
    return deck;
};

function loadPlayerDeckNoEpidemics(config) {
    let deck = [];
    for (let i = 0; i < config.cities.length; i++) {
        deck.push({
            name: config.cities[i].name,
            color: config.cities[i].color
        });
    }
    for (let i = 0; i < 8; i++) {
        deck.push({
            name: 'Blank',
            color: 'Blank',
        });
    }
    return deck;
};

function loadEpidemicCards(_config) {
    let cards = [];
    for (let i = 0; i < 4; i++) {
        cards.push({
            name: 'Epidemic',
            color: 'Green'
        });
    }
    return cards;
};

function loadPawns(config) {
    let pawns = [];
    for (let i = 0; i < config.init_pawns; i++) {
        let pawn = {};
        pawn.role = config.pawn_init_roles[i];
        pawn.location = config.pawn_init_locations[i];
        pawns.push(pawn);
    }
    return pawns;
};

function loadHands(config) {
    let hands = [];
    for (let i = 0; i < config.init_pawns; i++) {
        hands.push([]);
    }
    return hands;
};

function loadInfectionTrack(config) {
    return config.infection_rates;
};

function loadInfectionRate(config) {
    return config.init_infection_rate;
};

function loadMaxOutbreaks(config) {
    return config.max_outbreaks;
};

function loadInitOutbreaks(config) {
    return config.init_outbreaks;
};
