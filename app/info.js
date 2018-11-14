let infoInit = null;
let infoUpdate = null;
let infoClear = null;

(() => {

    let pawn_1_hand_btn = $('#pawn-1-hand-btn');
    let pawn_2_hand_btn = $('#pawn-2-hand-btn');
    let game_info_hand_btn = $('#game-info-btn');
    let city_info_hand_btn = $('#city-info-btn');
    let infect_discard_pile_btn = $('#infect-discard-pile-btn');
    let player_discard_pile_btn = $('#player-discard-pile-btn');

    let cure_black = $('#cure-black');
    let cure_blue = $('#cure-blue');
    let cure_red = $('#cure-red');
    let cure_yellow = $('#cure-yellow');

    let eradicate_black = $('#eradicate-black');
    let eradicate_blue = $('#eradicate-blue');
    let eradicate_red = $('#eradicate-red');
    let eradicate_yellow = $('#eradicate-yellow');

    let active_player = $('#active-player');
    let active_pawn = $('#active-pawn');
    let round = $('#round');
    let max_rounds = $('#max-rounds');
    let outbreaks = $('#outbreaks');
    let max_outbreaks = $('#max-outbreaks');
    let black_cubes = $('#black-cubes');
    let blue_cubes = $('#blue-cubes');
    let red_cubes = $('#red-cubes');
    let yellow_cubes = $('#yellow-cubes');
    let infection_rate = $('#infection-rate');

    infoInit = (data) => {
        console.log(data);
        setStaticInfo(data);
        updateDynamicInfo(data);
        toggleButtons();
    };

    infoUpdate = (data) => {
        console.log(data);
        updateDynamicInfo(data);
    };

    infoClear = () => {
        toggleButtons();
    };

    function toggleButtons() {
        pawn_1_hand_btn.prop('disabled', (_, val) => !val);
        pawn_2_hand_btn.prop('disabled', (_, val) => !val);
        game_info_hand_btn.prop('disabled', (_, val) => !val);
        city_info_hand_btn.prop('disabled', (_, val) => !val);
        infect_discard_pile_btn.prop('disabled', (_, val) => !val);
        player_discard_pile_btn.prop('disabled', (_, val) => !val);
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
        black_cubes.html(data.cubes['black']);
        blue_cubes.html(data.cubes['blue']);
        red_cubes.html(data.cubes['red']);
        yellow_cubes.html(data.cubes['yellow']);
        updateCuralbeDiseases(data);
        updateEradicableDiseases(data);
        infection_rate.html(data.infection_rate);
    };

    function updateCuralbeDiseases(data) {
        if (data.cured_diseases.includes('Black')) {
            cure_black.html($('<strike></strike>').text('Black'));
        } else {
            cure_black.html('Black');
        }
        if (data.cured_diseases.includes('Blue')) {
            cure_blue.html($('<strike></strike>').text('Blue'));
        } else {
            cure_blue.html('Blue');
        }
        if (data.cured_diseases.includes('Red')) {
            cure_red.html($('<strike></strike>').text('Red'));
        } else {
            cure_red.html('Red');
        }
        if (data.cured_diseases.includes('Yellow')) {
            cure_yellow.html($('<strike></strike>').text('Yellow'));
        } else {
            cure_yellow.html('Yellow');
        }
    };

    function updateEradicableDiseases(data) {
        if (data.eradicated_diseases.includes('Black')) {
            eradicate_black.html($('<strike></strike>').text('Black'));
        } else {
            eradicate_black.html('Black');
        }
        if (data.eradicated_diseases.includes('Blue')) {
            eradicate_blue.html($('<strike></strike>').text('Blue'));
        } else {
            eradicate_blue.html('Blue');
        }
        if (data.eradicated_diseases.includes('Red')) {
            eradicate_red.html($('<strike></strike>').text('Red'));
        } else {
            eradicate_red.html('Red');
        }
        if (data.eradicated_diseases.includes('Yellow')) {
            eradicate_yellow.html($('<strike></strike>').text('Yellow'));
        } else {
            eradicate_yellow.html('Yellow');
        }
    };

})();
