exports.validate = (config) => {
    return validateCities(config);
};

validateCities = (config) => {
    let valid = true;
    if (! ('cities' in config)) {
        console.error('ERROR: config does not include key: cities');
        return false;
    }
    if (! ('colors' in config)) {
        console.error('ERROR: config does not include key: colors');
        return false;
    }
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
        if (! ('neighbors' in city)) {
            console.error(`ERROR: ${city.name} does not include key: neighbors`);
            valid = false;
            continue;
        }
        if (! config.colors.includes(city.color)) {
            console.error(`ERROR: ${city.color} of ${city.name} not in: 'colors'`);
            valid = false;
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
