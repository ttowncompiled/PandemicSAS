const validator = require('./validator.js');
const singletonGameFactory = require('./factory.js').singletonGameFactory;

let model = null;

module.exports = {
    start: (config) => {
        try {
            if (validator.validate(config)) {
                model = singletonGameFactory(config);
                return true;
            } else {
                console.error(new Error('validation error'));
                return false;
            }
        } catch(e) {
            console.error(e);
            return false;
        }
    },

    cities: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        return model.cities;
    },

    status: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        return model.status;
    },

    stations: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        return model.stations;
    },

    infectDeck: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        return model.infect_deck;
    },

    infectDeckTop: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        if (model.infect_deck.length == 0) {
            return {};
        }
        return model.infect_deck[model.infect_deck.length - 1];
    },

    drawInfectCard: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        if (model.infect_deck.length == 0) {
            return {};
        }
        return model.infect_deck.pop();
    },

    infectDiscards: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        return model.infect_discards;
    },

    infectDiscardsTop: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        if (model.infect_discards.length == 0) {
            return {};
        }
        return model.infect_discards[model.infect_discards.length - 1];
    },

    shuffleInfectDeck: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        model.infect_deck = riffleShuffle(model.infect_deck);
        return model.infect_deck;
    },

    shuffleInfectDeckWithDiscards: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        model.infect_deck.concat(model.infect_discards);
        model.infect_discards = [];
        model.infect_deck = riffleShuffle(model.infect_deck);
        return model.infect_deck;
    },

    shuffleInfectDiscards: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        model.infect_discards = riffleShuffle(model.infect_discards);
        model.infect_deck.concat(model.infect_discards);
        model.infect_discards = [];
        return model.infect_deck;
    },

    playerDeck: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        return model.player_deck;
    },

    playerDeckTop: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        if (model.player_deck.length == 0) {
            return {};
        }
        return model.player_deck[model.player_deck.length - 1];
    },

    drawPlayerCard: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        if (model.player_deck.length == 0) {
            return {};
        }
        return model.player_deck.pop();
    },

    playerDiscards: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        return model.player_discards;
    },

    playerDiscardsTop: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        if (model.player_discards.length == 0) {
            return {};
        }
        return model.player_discards[model.player_discards.length - 1];
    },

    shufflePlayerDeck: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        model.player_deck = riffleShuffle(model.player_deck);
        return model.player_deck;
    },

    shufflePlayerDeckWithDiscards: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        model.player_deck.concat(model.player_discards);
        model.player_discards = [];
        model.player_deck = riffleShuffle(model.player_deck);
        return model.player_deck;
    },

    pawns: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        return model.pawns;
    },

    hands: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        return model.hands;
    },

    player: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        return model.player;
    },

    activePawn: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        return model.pawn;
    },

    round: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        return model.round;
    },

    turn: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        return model.turn;
    },

    stop: () => {
        model = null;
        return true;
    },
};

function riffleShuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
};
