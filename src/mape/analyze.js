exports.analyze = (probe, player) => {
    if (player === 'sys') {
        return sysAnalysis(probe);
    } else {
        return envAnalysis(probe);
    }
};

function envAnalysis(probe) {

};

function sysAnalysis(probe) {

};
