const axios = require('axios');

module.exports = {
    init: (app_port) => {
        return (() => {
            let port = app_port;
            return {
                reportInfect: (city, disease) => postInfo(port, `${disease} infection spread in ${city.name}`),

                reportOutbreak: (city, disease) => postWarn(port, `${disease} outbreak in ${city.name}`),

                reportTreatInfection: (city, disease) => postInfo(port, `one cube of ${disease} has been treated in ${city.name}`),

                reportInfectionCleared: (city, disease) => postInfo(port, `${disease} infection cleared in ${city.name}`),

                reportGameWin: () => postInfo(port, 'the game has been won'),

                reportGameLoss: () => postWarn(port, 'the game has been lost'),
            };
        })();
    },
};

function postInfo(port, msg) {
    return new Promise((resolve, reject) => {
        axios.post(`http://localhost:${port}/info`, {
                msg: msg,
            })
            .then((response) => {
                resolve(response.data);
            })
            .catch((reason) => {
                reject(reason);
            });
    });
};

function postWarn(port, msg) {
    return new Promise((resolve, reject) => {
        axios.post(`http://localhost:${port}/warn`, {
                msg: msg,
            })
            .then((response) => {
                resolve(response.data);
            })
            .catch((reason) => {
                reject(reason);
            });
    });
};
