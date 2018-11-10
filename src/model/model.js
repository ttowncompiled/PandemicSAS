const validator = require('./validator.js');
const singletonGameFactory = require('./factory.js').singletonGameFactory;

let model = null;

module.exports = {
    start: (config) => {
        return new Promise((resolve, reject) => {
            try {
                if (validator.validate(config)) {
                    model = singletonGameFactory(config);
                    resolve(module.exports.view());
                } else {
                    reject(new Error('validation error'));
                }
            } catch(e) {
                reject(e);
            }
        });
    },

    view: () => {
        return new Promise((resolve, reject) => {
            resolve(model);
        });
    },

    stop: () => {
        return new Promise((resolve, reject) => {
            model = null;
            resolve(true);
        });
    },

    undo: () => {
        return new Promise((resolve, reject) => {
            reject(new Error('TODO'));
        });
    },

};
