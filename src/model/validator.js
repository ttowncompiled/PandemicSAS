exports.validate = (config) => {
    return validateColors(config) && validateDiseases(config)
        && validateDiseaseCubes(config) && validateCities(config)
        && validateResearchStations(config) && validateRoles(config)
        && validatePawns(config);
};

function validateColors(config) {
    let valid = true;
    if (! ('colors' in config)) {
        console.error('ERROR: config does not include key: colors');
        return false;
    }
    if (! isUnique(config.colors)) {
        console.error('ERROR: colors contains duplicate colors');
        valid = false;
    }
    return valid;
};

function validateDiseases(config) {
    let valid = true;
    if (! ('diseases' in config)) {
        console.error('ERROR: config does not include key: diseases');
        return false;
    }
    if (! isUnique(config.diseases)) {
        console.error('ERROR: diseases contains duplicate colors');
        valid = false;
    }
    for (let i = 0; i < config.diseases; i++) {
        let disease = config.diseases[i];
        if (! config.colors.includes(disease)) {
            console.error(`ERROR: disease ${i} not in: colors`);
            valid = false;
        }
    }
    return valid;
};

function validateDiseaseCubes(config) {
    let valid = true;
    if (! ('max_disease_cubes' in config)) {
        console.error('ERROR: config does not include key: max_disease_cubes');
        return false;
    }
    if (! ('min_disease_cubes' in config)) {
        console.error('ERROR: config does not include key: min_disease_cubes');
        return false;
    }
    if (! ('disease_cubes' in config)) {
        console.error('ERROR: config does not include key: disease_cubes');
        return false;
    }
    if (! isUnique(config.disease_cubes.map((cube) => cube.color))) {
        console.error('ERROR: disease_cubes contains duplicate colors');
        valid = false;
    }
    if (config.disease_cubes.length != config.diseases.length) {
        console.error('ERROR: disease_cubes must have each disease in: diseases');
        valid = false;
    }
    for (let i = 0; i < config.disease_cubes; i++) {
        let cube = config.disease_cubes[i];
        if (! ('color' in cube)) {
            console.error(`ERROR: cube ${i} does not include key: color`);
            valid = false;
            continue;
        }
        if (! config.diseases.includes(cube.color)) {
            console.error(`ERROR: ${cube.color} of cube ${i} not in: diseases`);
            valid = false;
        }
        if (! ('count' in cube)) {
            console.error(`ERROR: cube ${i} does not include key: count`);
            valid = false;
            continue;
        }
        if (! Number.isInteger(cube.count)) {
            console.error(`ERROR: ${cube.count} of cube ${i} is not an Integer`);
            valid = false;
        }
        if (cube.count <= 0) {
            console.error(`ERROR: ${cube.count} of cube ${i} is not positive`);
            valid = false;
        }
        if (cube.count < config.min_disease_cubes) {
            console.error(`ERROR: ${cube.count} of cube ${i} is less than min_disease_cubes`);
            valid = false;
        }
        if (cube.count > config.max_disease_cubes) {
            console.error(`ERROR: ${cube.count} of cube ${i} is greater than max_disease_cubes`);
            valid = false;
        }
    }
    return valid;
};

function validateCities(config) {
    let valid = true;
    if (! ('cities' in config)) {
        console.error('ERROR: config does not include key: cities');
        return false;
    }
    let cityNames = config.cities.map((city) => city.name);
    if (! isUnique(cityNames)) {
        console.error('ERROR: cities contains duplicate city names');
        valid = false;
    }
    for (let i = 0; i < config.cities.length; i++) {
        let city = config.cities[i];
        if (! ('name' in city)) {
            console.error(`ERROR: city ${i} does not include key: name`);
            valid = false;
            continue;
        }
        if (! ('color' in city)) {
            console.error(`ERROR: ${city.name} does not include key: color`);
            valid = false;
            continue;
        }
        if (! config.colors.includes(city.color)) {
            console.error(`ERROR: ${city.color} of ${city.name} not in: colors`);
            valid = false;
        }
        if (! ('neighbors' in city)) {
            console.error(`ERROR: ${city.name} does not include key: neighbors`);
            valid = false;
            continue;
        }
        for (let j = 0; j < city.neighbors.length; j++) {
            let neighbor = city.neighbors[j];
            if (! cityNames.includes(neighbor)) {
                console.error(`ERROR: ${neighbor} of ${city.name} not in: cities`);
                valid = false;
            }
            if (! config.cities[cityNames.indexOf(neighbor)].neighbors.includes(city.name)) {
                console.error(`ERROR: ${neighbor} is not a neighbor to its neighbor: ${city.name}`);
                valid = false;
            }
        }
    }
    return valid;
};

function validateResearchStations(config) {
    let valid = true;
    if (! ('max_research_stations' in config)) {
        console.error('ERROR: config does not include key: max_research_stations');
        return false;
    }
    if (! ('research_stations' in config)) {
        console.error('ERROR: config does not include key: research_stations');
        return false;
    }
    if (! isUnique(config.research_stations)) {
        console.error('ERROR: research_stations contains duplicate stations');
        valid = false;
    }
    if (config.research_stations.length <= 0) {
        console.error('ERROR: there are no stations in research_stations');
        valid = false;
    }
    if (config.research_stations.length > config.max_research_stations) {
        console.error('ERROR: there are more stations than max_research_stations in research_stations');
        valid = false;
    }
    let cityNames = config.cities.map((city) => city.name);
    for (let i = 0; i < config.research_stations; i++) {
        let station = config.research_stations[i];
        if (! cityNames.includes(station)) {
            console.error(`ERROR: ${station} not in cities`);
            valid = false;
        }
    }
    return valid;
};

function validateRoles(config) {
    let valid = true;
    if (! ('roles' in config)) {
        console.error('ERROR: config does not include key: roles');
        return false;
    }
    if (! ('roles_are_unique' in config)) {
        console.error('ERROR: config does not include key: roles_are_unique');
        return false;
    }
    if (! ('random_roles' in config)) {
        console.error('ERROR: config does not include key: random_roles');
        return false;
    }
    if (! isUnique(config.roles)) {
        console.error('ERROR: roles contains duplicate roles');
        valid = false;
    }
    if (typeof config.roles_are_unique !== 'boolean') {
        console.error('ERROR: roles_are_unique is not a boolean');
        valid = false;
    }
    if (! isUnique(config.random_roles)) {
        console.error('ERROR: random_roles contains duplicate roles');
        valid = false;
    }
    for (let i = 0; i < config.random_roles.length; i++) {
        let role = config.random_roles[i];
        if (! config.roles.includes(role)) {
            console.error(`ERROR: role ${role} from random_roles is not in: roles`);
            valid = false;
        }
    }
    return valid;
};

function validatePawns(config) {
    // TODO: validate hand size
    let valid = true;
    if (! ('max_pawns' in config)) {
        console.error('ERROR: config does not include key: max_pawns');
        return false;
    }
    if (! Number.isInteger(config.max_pawns)) {
        console.error('ERROR: max_pawns is not an Integer');
        valid = false;
    }
    if (config.max_pawns <= 0) {
        console.error('ERROR: max_pawns is not positive');
        valid = false;
    }
    if (! ('init_pawns' in config)) {
        console.error('ERROR: config does not include key: init_pawns');
        return false;
    }
    if (! Number.isInteger(config.init_pawns)) {
        console.error('ERROR: init_pawns is not an Integer');
        valid = false;
    }
    if (config.init_pawns <= 0) {
        console.error('ERROR: init_pawns is not positive');
        valid = false;
    }
    if (config.init_pawns > config.max_pawns) {
        console.error('ERROR: init_pawns is greater than max_pawns');
        valid = false;
    }
    if (! ('pawn_init_locations' in config)) {
        console.error('ERROR: config does not include key: pawn_init_locations');
        return false;
    }
    if (! ('pawn_init_roles' in config)) {
        console.error('ERROR: config does not include key: pawn_init_roles');
        return false;
    }
    if (config.pawn_init_locations.length != config.max_pawns) {
        console.error('ERROR: there is not an initial pawn location for each possible pawn in pawn_init_locations');
        valid = false;
    }
    for (let i = 0; i < config.pawn_init_locations.length; i++) {
        let location = config.pawn_init_locations[i];
        if (! config.research_stations.includes(location)) {
            console.error(`ERROR: location ${location} from pawn_init_location not in: research_stations`);
            valid = false;
        }
    }
    if (config.pawn_init_roles.length != config.max_pawns) {
        console.error('ERROR: there is not an initial role for each possible pawn in pawn_init_roles');
        valid = false;
    }
    for (let i = 0; i < config.pawn_init_roles.length; i++) {
        let role = config.pawn_init_roles[i];
        if (! config.roles.includes(role)) {
            console.error(`ERROR: role ${role} from pawn_init_roles not in: roles`);
            valid = false;
        }
    }
    if (! isUnique(config.pawn_init_roles) && config.roles_are_unique) {
        console.error('ERROR: pawn roles are not unique according to roles_are_unique');
        valid = false;
    }
    return valid;
};

function isUnique(arr) {
    let filter = {};
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] in filter) {
            return false;
        }
        filter[arr[i]] = true;
    }
    return true;
};
