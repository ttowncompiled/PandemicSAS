const model = require('./model.js');
const adapter = require('./adapter.js');

let model_adapter = adapter.adapt(model);
let is_adapting = false;

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

    infectCity: (reporter) => {
        let card = model.peekInfectPile();
        let city = model.cities()[card.name];
        let did_outbreak = increaseInfection(city, city.color, reporter);
        if (gameHasBeenLost()) {
            reporter.reportGameLoss();
        } else if (did_outbreak) {
            reporter.reportAdapt();
            is_adapting = true;
        }
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

    treatDisease: (location, reporter) => {
        let best_disease = '';
        for (let disease in model.status()[location]) {
            if (best_disease === '' || model.status()[location][best_disease] < model.status()[location][disease]) {
                best_disease = disease;
            }
        }
        let city = model.cities()[location];
        model.treatDisease(city, best_disease);
        reporter.reportTreatInfection(city, best_disease);
        if (model.status()[city.name][best_disease] === 0) {
            reporter.reportInfectionCleared(city, best_disease);
        }
    },

    sysYield: (reporter) => {
        model.nextPlayer();
        if (is_adapting) {
            reporter.reportStable();
            is_adapting = false;
        }
    },
};

function increaseInfection(city, disease, reporter, ignore={}) {
    if (city.name in ignore) {
        return;
    }
    ignore[city.name] = true;
    if (model.status()[city.name][disease] < 3) {
        model.infectCity(city, disease);
        reporter.reportInfect(city, disease);
        return false;
    } else {
        model.increaseOutbreaks();
        reporter.reportOutbreak(city);
        outbreak(city, disease, ignore);
        return true;
    }
};

function outbreak(city, disease, reporter, ignore) {
    for (let i = 0; i < city.neighbors.length; i++) {
        let neighbor = model.cities()[city.neighbors[i]];
        increaseInfection(neighbor, disease, reporter, ignore);
    }
};

function gameHasBeenLost() {
    if (model.outbreaks() > model.maxOutbreaks()) {
        return true;
    }
    if (model.round() > model.maxRounds()) {
        return true;
    }
    let cubes = model.cubes();
    let counts = Object.keys(cubes).map((key) => cubes[key]);
    for (let i = 0; i < counts.length; i++) {
        if (counts[i] <= 0) {
            return true;
        }
    }
    return false;
};
