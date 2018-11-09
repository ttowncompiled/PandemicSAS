const validator = require('./validator.js');
const singletonGameFactory = require('./factory.js').singletonGameFactory;

let model = null;

module.exports = {
    load: (config) => {
        return new Promise((resolve, reject) => {
            try {
                if (validator.validate(config)) {
                    model = singletonGameFactory(config);
                    resolve(module.exports.monitor());
                } else {
                    reject(new Error('validation error'));
                }
            } catch(e) {
                reject(e);
            }
        });
    },

    monitor: () => {
        return new Promise((resolve, reject) => {
            // TODO: return city statuses and pawn locations
            console.log(JSON.stringify(model, null, 2));
            resolve(model);
        });
    },
};
