const model = require('./model.js');
const adapter = require('./adapter.js');

let model_adapter = adapter.adapt(model);

module.exports = {
    start: (config) => {
        return model.start(config);
    },

    view: () => {
        return model_adapter;
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
        model.infectCity(city, card.color);
    },

    dealPlayerCard: (is_start) => {
        let card = model.drawPlayerCard();
        if (is_start) {
            for (let i = 0; i < model.pawns().length-1; i++) {
                if (model.hands()[i].length > model.hands()[i+1].length) {
                    model.dealCardTo(card, model.pawns()[i+1]);
                    return;
                }
            }
            model.dealCardTo(card, model.pawns()[0]);
        } else {
            model.dealCardTo(card, model.activePawn());
        }
    },

    envYield: (is_start) => {
        model.nextPlayer();
        if (! is_start) {
            model.nextPawn();
            model.nextTurn();
            if (model.activePawn().id === 0) {
                model.nextRound();
            }
        } else {
            model.addEpidemicCards();
            model.shufflePlayerDeck();
            model.nextTurn();
            model.nextRound();
        }
    },

    drivePawn: (location) => {
        let pawn = model.activePawn();
        let city = model.cities()[location];
        model.movePawnTo(pawn, city);
    },

    treatDisease: (location) => {
        let best_disease = '';
        for (let disease in model.status()[location]) {
            if (best_disease === '' || model.status()[location][best_disease] < model.status()[location][disease]) {
                best_disease = disease;
            }
        }
        let city = model.cities()[location];
        model.treatDisease(city, best_disease);
    },

    sysYield: () => {
        model.nextPlayer();
    },
};
