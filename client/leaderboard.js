const scoreboard = require('../js/scoreboard.js');

$(document).ready(function(){
    const leaderscore = function(id, callback) {
        multiplayer.scoreBoard(name, score, function(err, rows) {
            var player = name;
            var points = score;
            var leaderb = {name:player, score:points};
            console.log(player + "'" + points);
            $.post('/api/scoreboard', function(result) {
                //get the scores and output in html 
               
            })
        });
    };
});
