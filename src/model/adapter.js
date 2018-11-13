module.exports = {
    adapt: (model) => {
        return {
            cities: () => model.cities(),

            status: () => model.status(),

            stations: () => model.stations(),

            infectDeck: () => model.infectDeck(),

            infectDeckTop: () => model.infectDeckTop(),

            infectDiscards: () => model.infectDiscards(),

            infectDiscardsTop: () => model.infectDiscardsTop(),

            playerDeck: () => model.playerDeck(),

            playerDeckTop: () => model.playerDeckTop(),

            playerDiscards: () => model.playerDiscards(),

            playerDiscardsTop: () => model.playerDiscardsTop(),

            pawns: () => model.pawns(),

            hands: () => model.hands(),

            player: () => model.player(),

            activePawn: () => model.activePawn(),

            infectionRate: () => model.infectionRate(),

            outbreaks: () => model.outbreaks(),

            round: () => model.round(),

            turn: () => model.turn(),
        };
    }
};
