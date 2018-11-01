exports.singletonGameFactory = (config) => {
    let city_status = {};
    for (let i = 0; i < config.cities.length; i++) {
        let city = config.cities[i];
        if (! config.colors.includes(city.color)) {
            throw new Error(`${city.color} is not in colors`);
        }
        let status = {};
        for (let j = 0; j < config.diseases.length; j++) {
            let color = config.diseases[j];
            if (! config.colors.includes(color)) {
                throw new Error(`${color} is not in colors`);
            }
            status[color] = 0;
        }
        city_status[city.name] = {
            city: city,
            status: status,
        };
    }
    return city_status;
}

