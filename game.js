var GameModule = {
    init : function() {
        this.players = {};
    },
    addPlayer : function(player) {
       // this.players[player.id] = player;
    },
    getPlayers: function(){
        return this.players;
    }
};

module.exports = GameModule;
