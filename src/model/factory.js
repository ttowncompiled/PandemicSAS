exports.singletonGameFactory = (config) => {
    let model = {};
    model.cities = loadCities(config);
    return model;
};

function loadCities(config) {
    let cities = {};
    for (let i = 0; i < config.cities.length; i++) {
        let city = config.cities[i];
        cities[city.name] = city;
        for (let j = 0; j < config.diseases; j++) {

        }
    }
    return cities;
};
