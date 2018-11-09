exports.validate = (config) => {
    return validateColors(config) && validateDiseases(config)
        && validateDiseaseCubes(config) && validateCities(config);
};

function validateColors(config) {
    if (! ('colors' in config)) {
        console.error('ERROR: config does not include key: colors');
        return false;
    }
    return true;
};

function validateDiseases(config) {
    if (! ('diseases' in config)) {
        console.error('ERROR: config does not include key: diseases');
        return false;
    }
    return true;
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
    // TODO: validate that each disease cube has a unique color
    for (let i = 0; i < config.disease_cubes; i++) {
        let cube = config.disease_cubes[i];
        if (! ('color' in cube)) {
            console.error(`ERROR: cube ${i} does not include key: color`);
            valid = false;
            continue;
        }
        if (! config.diseases.includes(cube.color)) {
            console.error(`ERROR: ${cube.color} of cube ${i} not in: 'diseases'`);
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
    // TODO: validate that each city has a unique name
    let cityNames = config.cities.map((city) => city.name);
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
            console.error(`ERROR: ${city.color} of ${city.name} not in: 'colors'`);
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
                console.error(`ERROR: ${neighbor} of ${city.name} not in: 'cities'`);
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
