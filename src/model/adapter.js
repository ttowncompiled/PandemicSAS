module.exports = {
    adapt: (model) => {
        return {
            curableDiseases: () => model.curableDiseases(),

            curedDiseases: () => model.curedDiseases(),

            uncuredDiseases: () => model.uncuredDiseases(),

            eradicableDiseases: () => model.eradicableDiseases(),

            eradicatedDiseases: () => model.eradicatedDiseases(),

            uneradicatedDiseases: () => model.uneradicatedDiseases(),

            cubes: () => model.cubes(),

            cities: () => model.cities(),

            status: () => model.status(),

            stations: () => model.stations(),

            infectDeck: () => model.infectDeck(),

            peekInfectDeck: () => model.peekInfectDeck(),

            infectPile: () => model.infectPile(),

            peekInfectPile: () => model.peekInfectPile(),

            playerDeck: () => model.playerDeck(),

            peekPlayerDeck: () => model.peekPlayerDeck(),

            playerPile: () => model.playerPile(),

            peekPlayerPile: () => model.peekPlayerPile(),

            pawns: () => model.pawns(),

            hands: () => model.hands(),

            activePlayer: () => model.activePlayer(),

            activePawn: () => model.activePawn(),

            infectionRateTrack: () => model.infectionRateTrack(),

            infectionRate: () => model.infectionRate(),

            maxOutbreaks: () => model.maxOutbreaks(),

            outbreaks: () => model.outbreaks(),

            outbreakLocations: () => model.outbreakLocations(),

            maxRounds: () => model.maxRounds(),

            round: () => model.round(),

            turn: () => model.turn(),
        };
    }
};
