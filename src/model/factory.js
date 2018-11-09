exports.singletonGameFactory = (config) => {
    let model = {};
    model.cities = loadCities(config);
    model.status = loadStatus(config);
    model.stations = loadResearchStations(config);
    model.pawns = loadPawns(config);
    return model;
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
