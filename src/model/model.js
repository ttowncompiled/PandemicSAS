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

    infectCity: (card) => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        if (! (card.name in model.status)) {
            console.error(new Error(`${city.name} has no status`));
            return null;
        }
        if (! (card.color in model.status[card.name])) {
            console.error(new Error(`${card.color} of ${city.name} has no status`));
            return null;
        }
        model.status[card.name][card.color]++;
        return model.status[card.name];
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
        let card = model.infect_deck.pop();
        model.infect_discards.push(card);
        return card;
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
        let card = model.player_deck.pop();
        model.player_discards.push(card);
        return card;
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
