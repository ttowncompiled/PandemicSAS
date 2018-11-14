let infoInit = null;
let infoUpdate = null;

(() => {

    let active_player = $('#active-player');
    let active_pawn = $('#active-pawn');
    let round = $('#round');

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

    };

    function updateDynamicInfo(data) {
        active_player.html(data.player);
        active_pawn.html(data.pawn);
        round.html(data.round);
    };

})();
