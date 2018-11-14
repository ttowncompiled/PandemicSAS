let infoInit = null;
let infoUpdate = null;

(() => {

    let active_player = $('#active-player');
    let active_pawn = $('#active-pawn');
    let round = $('#round');
    let max_rounds = $('#max-rounds');
    let outbreaks = $('#outbreaks');
    let max_outbreaks = $('#max-outbreaks');
    let infection_rate = $('#infection-rate');

    infoInit = (data) => {
        console.log(data);
        setStaticInfo(data);
        updateDynamicInfo(data);
    };

    infoUpdate = (data) => {
        console.log(data);
        updateDynamicInfo(data);
    };

    function setStaticInfo(data) {
        max_rounds.html(data.max_rounds);
        max_outbreaks.html(data.max_outbreaks);
    };

    function updateDynamicInfo(data) {
        active_player.html(data.player);
        active_pawn.html(data.pawn);
        round.html(data.round);
        outbreaks.html(data.outbreaks);
        infection_rate.html(data.infection_rate);
    };

})();
