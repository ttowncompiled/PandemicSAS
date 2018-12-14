const validator = require('./validator.js');
const singletonGameFactory = require('./factory.js').singletonGameFactory;

let model = null;

module.exports = {
    start: (config, scenario) => {
        try {
            if (validator.validate(config)) {
                model = singletonGameFactory(config, scenario);
                if (scenario === 1) {
                    console.log('>>> scenario 1');
                } else if (scenario === 2) {
                    console.log('>>> scenario 2');
                } else if (scenario === 3) {
                    console.log('>>> scenario 3');
                } else if (scenario === 4) {
                    console.log('>>> scenario 3-2');
                } else {
                    module.exports.shuffleInfectDeck();
                    module.exports.shufflePlayerDeck();
                }
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

    curableDiseases: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        return Object.keys(model.curable);
    },

    curedDiseases: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        return Object.keys(model.curable).filter((key) => model.curable[key]);
    },

    uncuredDiseases: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        return Object.keys(model.curable).filter((key) => ! model.curable[key]);
    },

    cureDisease: (disease) => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        model.curable[disease] = true;
        return Object.keys(model.curable).filter((key) => model.curable[key]);
    },

    eradicableDiseases: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        return Object.keys(model.eradicable);
    },

    eradicatedDiseases: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        return Object.keys(model.eradicable).filter((key) => model.eradicable[key]);
    },

    uneradicatedDiseases: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        return Object.keys(model.eradicable).filter((key) => ! model.eradicable[key]);
    },

    eradicateDisease: (disease) => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        model.eradicable[disease] = true;
        return Object.keys(model.eradicable).filter((key) => model.eradicable[key]);
    },

    cubes: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        return model.cubes;
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

    treatDisease: (city, disease) => {
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
        model.status[city.name][disease]--;
        model.cubes[disease.toLowerCase()]++;
        return model.status[city.name];
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
        model.cubes[disease.toLowerCase()]--;
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

    addEpidemicCards: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        model.player_deck.concat(model.epidemic_cards);
        return model.player_deck;
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

    movePawnTo: (pawn, city) => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        model.pawns[pawn.id-1].location = {
            name : city.name,
        };
        return model.pawns[pawn.id-1];
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
        model.hands[pawn.id-1].push(card);
        return model.hands[pawn.id-1];
    },

    discardCardFrom: (card, pawn) => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        model.hands[pawn.id-1].splice(model.hands[pawn.id-1].map((card) => card.name).indexOf(card.name), 1);
        model.player_pile.push(card);
        return model.hands[pawn.id-1];
    },

    activePlayer: () => {
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
        model.pawn = model.pawns[model.pawn.id % model.pawns.length];
        return model.pawn;
    },

    infectionRateTrack: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        return model.infection_rate_track;
    },

    infectionRate: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        return model.infection_rate_track[model.infection_rate-1];
    },

    increaseInfectionRate: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        if (model.infection_rate < model.infection_rate_track.length) {
            model.infection_rate++;
        }
        return model.infection_rate_track[model.infection_rate-1];
    },

    maxOutbreaks: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        return model.max_outbreaks;
    },

    outbreaks: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        return model.outbreaks;
    },

    outbreakLocations: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        return model.outbreak_locations;
    },

    increaseOutbreaks: (city) => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        model.outbreaks++;
        model.outbreak_locations.push(city.name);
        return model.outbreaks;
    },

    maxRounds: () => {
        if (model === null) {
            console.error(new Error('uninstantiated model'));
            return null;
        }
        return model.max_rounds;
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
