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
    },

    drawInfectCard: () => {
        let card = model.drawInfectCard();
        model.discardInfectCard(card);
    },

    infectCity: () => {
        let card = model.peekInfectPile();
        let city = model.cities()[card.name];
        let status = model.infectCity(city, card.color);
    },

    dealPlayerCard: (is_start) => {
        let card = model.drawPlayerCard();
        if (is_start) {
            for (let i = 0; i < model.pawns().length-1; i++) {
                if (model.hands()[i].length > model.hands()[i+1].length) {
                    model.hands()[i+1].push(card);
                    console.log(JSON.stringify(model.hands()[i+1], null, 2));
                    return;
                }
            }
            model.hands()[0].push(card);
        } else {
            model.hands()[model.activePawn()].push(card);
        }
    },

    envYield: (is_start) => {
        model.nextPlayer();
        if (! is_start) {
            model.nextPawn();
            model.nextTurn();
            if (model.activePawn() === 0) {
                model.nextRound();
            }
        }
    }
};
