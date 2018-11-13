const validator = require('./validator.js');
const singletonGameFactory = require('./factory.js').singletonGameFactory;

let model = null;

module.exports = {
    start: (config) => {
        try {
            if (validator.validate(config)) {
                model = singletonGameFactory(config);
                module.exports.shuffleInfectDeck();
                module.exports.shufflePlayerDeck();
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

    infectCity: (city, disease) => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        if (! (city.name in model.status)) {
            console.error(new Error(`${city.name} has no status`));
            return null;
        }
        if (! (disease in model.status[city.name])) {
            console.error(new Error(`${city.name} has no status for ${disease}`));
            return null;
        }
        model.status[city.name][disease]++;
        return model.status[city.name];
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

    peekInfectDeck: () => {
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

    discardInfectCard: (card) => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        model.infect_pile.push(card);
        return model.infect_pile;
    },

    infectPile: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        return model.infect_pile;
    },

    peekInfectPile: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        if (model.infect_pile.length == 0) {
            return {};
        }
        return model.infect_pile[model.infect_pile.length - 1];
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
        model.infect_deck.concat(model.infect_pile);
        model.infect_pile = [];
        model.infect_deck = riffleShuffle(model.infect_deck);
        return model.infect_deck;
    },

    shuffleInfectPile: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        model.infect_pile = riffleShuffle(model.infect_pile);
        model.infect_deck.concat(model.infect_pile);
        model.infect_pile = [];
        return model.infect_deck;
    },

    playerDeck: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        return model.player_deck;
    },

    peekPlayerDeck: () => {
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

    playerPile: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        return model.player_pile;
    },

    peekPlayerPile: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        if (model.player_pile.length == 0) {
            return {};
        }
        return model.player_pile[model.player_pile.length - 1];
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
        model.player_deck.concat(model.player_pile);
        model.player_pile = [];
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

    movePawnTo: (pawn, location) => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        model.pawns[pawn].location = location;
        return model.pawns[pawn];
    },

    hands: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        return model.hands;
    },

    dealCardTo: (card, pawn) => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        model.hands[pawn].push(card);
        return model.hands[pawn];
    },

    discardCardFrom: (card, pawn) => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        model.hands[pawn].splice(model.hands[pawn].map((card) => card.name).indexOf(card.name), 1);
        model.player_discards.push(card);
        return model.hands[pawn];
    },

    player: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        return model.player;
    },

    nextPlayer: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        if (model.player === 'sys') {
            model.player = 'env';
        } else {
            model.player = 'sys';
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

    nextPawn: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        model.pawn = (model.pawn + 1) % model.pawns.length;
        return model.pawn;
    },

    infectionRate: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        return model.infection_rate;
    },

    outbreaks: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        return model.outbreaks;
    },

    round: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        return model.round;
    },

    nextRound: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        model.round++;
        return model.round;
    },

    turn: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        return model.turn;
    },

    nextTurn: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        model.turn++;
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
