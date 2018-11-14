const axios = require('axios');

module.exports = {
    init: (app_port) => {
        return (() => {
            let port = app_port;
            return {
                reportOutbreak: (city) => {
                    return new Promise((resolve, reject) => {
                        axios.post(`http://localhost:${port}/info`, {
                                msg: `outbreak in ${city.name}`,
                            })
                            .then((response) => {
                                resolve(response.data);
                            })
                            .catch((reason) => {
                                reject(reason);
                            });
                    });
                },
            };
        })();
    },
};
