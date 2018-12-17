exports.singletonGameFactory = (config, scenario) => {
    let model = {};
    model.curable = loadCurableDiseases(config);
    model.eradicable = loadEradicableDiseases(config);
    model.cubes = loadCubes(config);
    model.cities = loadCities(config);
    model.status = loadStatus(config);
    model.stations = loadResearchStations(config);
    model.infect_deck = loadInfectDeck(config, scenario);
    model.infect_pile = [];
    model.player_deck = loadPlayerDeckNoEpidemics(config, scenario);
    model.player_pile = [];
    model.epidemic_cards = loadEpidemicCards(config);
    model.pawns = loadPawns(config, scenario);
    model.hands = loadHands(config);
    model.player = 'env';
    model.pawn = model.pawns[0];
    model.infection_rate_track = loadInfectionTrack(config);
    model.infection_rate = loadInfectionRate(config);
    model.max_outbreaks = loadMaxOutbreaks(config, scenario);
    model.outbreaks = loadInitOutbreaks(config);
    model.outbreak_locations = [];
    model.max_rounds = loadMaxRounds(config);
    model.round = 0;
    model.turn = 0;
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

function loadCubes(config) {
    let cubes = {};
    for(let i = 0; i < config.disease_cubes.length; i++) {
        let cube = config.disease_cubes[i];
        cubes[cube.color.toLowerCase()] = cube.count;
    }
    return cubes;
};

function loadCities(config) {
    let cities = {};
    for (let i = 0; i < config.cities.length; i++) {
        let city = config.cities[i];
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

function loadInfectDeck(config, scenario) {
    let deck = [];
    if (scenario === 1) {
        deck.push({ name: 'Paris', color: 'Blue', });
        deck.push({ name: 'Istanbul', color: 'Black', });
        deck.push({ name: 'Khartoum', color: 'Yellow', });
        deck.push({ name: 'Milan', color: 'Blue', });
        deck.push({ name: 'Karachi', color: 'Black', });
        deck.push({ name: 'Kinshasa', color: 'Yellow', });
        deck.push({ name: 'Essen', color: 'Blue', });
        deck.push({ name: 'Delhi', color: 'Black', });
        deck.push({ name: 'Johannesburg', color: 'Yellow', });
        let rigged = deck.map((card) => card.name);
        for (let i = 0; i < config.cities.length; i++) {
            if (rigged.includes(config.cities[i].name)) {
                continue;
            }
            deck.push({
                name: config.cities[i].name,
                color: config.cities[i].color,
            });
        }
        deck = deck.reverse();
    } else if (scenario === 2) {
        deck.push({ name: 'Paris', color: 'Blue', });
        deck.push({ name: 'Istanbul', color: 'Black', });
        deck.push({ name: 'Khartoum', color: 'Yellow', });
        deck.push({ name: 'Montreal', color: 'Blue', });
        deck.push({ name: 'Karachi', color: 'Black', });
        deck.push({ name: 'Mexico City', color: 'Yellow', });
        deck.push({ name: 'Washington', color: 'Blue', });
        deck.push({ name: 'Delhi', color: 'Black', });
        deck.push({ name: 'Miami', color: 'Yellow', });
        deck.push({ name: 'Paris', color: 'Blue', });
        let rigged = deck.map((card) => card.name);
        for (let i = 0; i < config.cities.length; i++) {
            if (rigged.includes(config.cities[i].name)) {
                continue;
            }
            deck.push({
                name: config.cities[i].name,
                color: config.cities[i].color,
            });
        }
        deck = deck.reverse();
    } else if (scenario === 3) {
        deck.push({ name: 'Chicago', color: 'Blue', });
        let rigged = deck.map((card) => card.name);
        for (let i = 0; i < config.cities.length; i++) {
            if (rigged.includes(config.cities[i].name)) {
                continue;
            }
            deck.push({
                name: config.cities[i].name,
                color: config.cities[i].color,
            });
        }
        deck = deck.reverse();
    } else if (scenario === 4) {
        deck.push({ name: 'Paris', color: 'Blue', });
        deck.push({ name: 'Hong Kong', color: 'Red', });
        deck.push({ name: 'Kinshasa', color: 'Yellow', });
        deck.push({ name: 'Chicago', color: 'Blue', });
        deck.push({ name: 'Jakarta', color: 'Red', });
        deck.push({ name: 'Mexico City', color: 'Yellow', });
        deck.push({ name: 'San Francisco', color: 'Blue', });
        deck.push({ name: 'Manila', color: 'Red', });
        deck.push({ name: 'Los Angeles', color: 'Yellow', });
        deck.push({ name: 'Paris', color: 'Blue', });
        let rigged = deck.map((card) => card.name);
        for (let i = 0; i < config.cities.length; i++) {
            if (rigged.includes(config.cities[i].name)) {
                continue;
            }
            deck.push({
                name: config.cities[i].name,
                color: config.cities[i].color,
            });
        }
        deck = deck.reverse();
    } else {
        for (let i = 0; i < config.cities.length; i++) {
            deck.push({
                name: config.cities[i].name,
                color: config.cities[i].color,
            });
        }
    }
    return deck;
};

function loadPlayerDeckNoEpidemics(config, scenario) {
    let deck = [];
    if (scenario === 1) {
        deck.push({ name: 'Paris', color: 'Blue', });
        deck.push({ name: 'Istanbul', color: 'Black', });
        let rigged = deck.map((card) => card.name);
        for (let i = 0; i < 8; i++) {
            deck.push({
                name: 'Blank',
                color: 'Blank',
            });
        }
        for (let i = 0; i < config.cities.length; i++) {
            if (rigged.includes(config.cities[i].name)) {
                continue;
            }
            deck.push({
                name: config.cities[i].name,
                color: config.cities[i].color,
            });
        }
        deck = deck.reverse();
    } else if (scenario === 2) {
        deck.push({ name: 'Paris', color: 'Blue', });
        deck.push({ name: 'Essen', color: 'Blue', });
        deck.push({ name: 'Khartoum', color: 'Yellow', });
        let rigged = deck.map((card) => card.name);
        for (let i = 0; i < 8; i++) {
            deck.push({
                name: 'Blank',
                color: 'Blank',
            });
        }
        for (let i = 0; i < config.cities.length; i++) {
            if (rigged.includes(config.cities[i].name)) {
                continue;
            }
            deck.push({
                name: config.cities[i].name,
                color: config.cities[i].color,
            });
        }
        deck = deck.reverse();
    } else if (scenario === 3) {
        deck.push({ name: 'Istanbul', color: 'Black', });
        deck.push({ name: 'Blank', color: 'Blank', });
        deck.push({ name: 'Karachi', color: 'Black', });
        deck.push({ name: 'Blank', color: 'Blank', });
        deck.push({ name: 'Delhi', color: 'Black', });
        deck.push({ name: 'Blank', color: 'Blank', });
        deck.push({ name: 'Cairo', color: 'Black', });
        deck.push({ name: 'Blank', color: 'Blank', });
        let rigged = deck.map((card) => card.name);
        for (let i = 0; i < 4; i++) {
            deck.push({
                name: 'Blank',
                color: 'Blank',
            });
        }
        for (let i = 0; i < config.cities.length; i++) {
            if (rigged.includes(config.cities[i].name)) {
                continue;
            }
            deck.push({
                name: config.cities[i].name,
                color: config.cities[i].color,
            });
        }
        deck = deck.reverse();
    } else if (scenario === 4) {
        deck.push({ name: 'Blank', color: 'Blank', });
        deck.push({ name: 'Istanbul', color: 'Black', });
        deck.push({ name: 'Blank', color: 'Blank', });
        deck.push({ name: 'Karachi', color: 'Black', });
        deck.push({ name: 'Blank', color: 'Blank', });
        deck.push({ name: 'Delhi', color: 'Black', });
        deck.push({ name: 'Blank', color: 'Blank', });
        deck.push({ name: 'Cairo', color: 'Black', });
        let rigged = deck.map((card) => card.name);
        for (let i = 0; i < 4; i++) {
            deck.push({
                name: 'Blank',
                color: 'Blank',
            });
        }
        for (let i = 0; i < config.cities.length; i++) {
            if (rigged.includes(config.cities[i].name)) {
                continue;
            }
            deck.push({
                name: config.cities[i].name,
                color: config.cities[i].color,
            });
        }
        deck = deck.reverse();
    } else {
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

function loadPawns(config, scenario) {
    let pawns = [];
    let colors = ['orange', 'green', 'purple', 'pink'];
    for (let i = 0; i < config.init_pawns; i++) {
        let pawn = {
            id: i+1,
            name: `${i+1}`,
            role: config.pawn_init_roles[i],
            location: {
                name: config.pawn_init_locations[i],
            },
            color: colors[i],
        };
        pawns.push(pawn);
    }
    if (scenario === 3) {
        pawns[0].location.name = 'London';
    } else if (scenario === 4) {
        pawns[1].location.name = 'London';
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

function loadMaxOutbreaks(config, scenario) {
    if (scenario === 4) {
        return 1;
    } else {
        return config.max_outbreaks;
    }
};

function loadInitOutbreaks(config) {
    return config.init_outbreaks;
};

function loadMaxRounds(config) {
    return config.max_rounds;
};
