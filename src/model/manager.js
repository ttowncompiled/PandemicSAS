const model = require('./model.js');
const adapter = require('./adapter.js');

module.exports = {
    start: (config) => {
        return model.start(config);
    },

    view: () => {
        return adapter.adapt(model);
    },

    stop: () => {
        return model.stop();
    }
};
