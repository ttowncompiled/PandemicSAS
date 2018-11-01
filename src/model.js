const singletonGameFactory = require('./factory.js').singletonGameFactory;

let model = null;

exports.load = (config) => {
    return new Promise((resolve, reject) => {
        try {
            model = singletonGameFactory(config);
            resolve(model);
        } catch(e) {
            reject(e);
        }
    });
}

