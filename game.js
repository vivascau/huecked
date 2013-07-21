var GameModule = {



    init : function(hueMod, colorsMod) {
        this.hueMod = hueMod;
        this.colorsMod = colorsMod;

        this.gameStarted = false;
        this.minimumUsers = 2;
        this.playersConnected = [];
        this.magicColour = null;

        this.playerAvailableColours = [
            {name:'Cyan', off: '00ffff', hex: 'a9ffff' },
            {name:'Silver', off: 'bcbcbc', hex: '999999' },
            {name:'Grey', off: '565656', hex: '333333' },
            {name:'Blue', off: '005dff', hex: '4c8cfc' },
            {name:'Orange', off: 'ff7900', hex: 'ffb068' },
            {name:'Green', off: '00a000', hex: '5c9c5c' },
            {name:'Yellow', off: 'ffe800', hex: 'fff26b' },
            {name:'Magenta', off: 'fa0085', hex: 'ff8ac8' },
            {name:'Red', off: 'ff1700', hex: 'ff8b7f' }];

        this.gameAvailableColours = [
            {name:'Cyan', off: '00ffff', hex: 'a9ffff' },
            {name:'Silver', off: 'bcbcbc', hex: '999999' },
            {name:'Grey', off: '565656', hex: '333333' },
            {name:'Blue', off: '005dff', hex: '4c8cfc' },
            {name:'Orange', off: 'ff7900', hex: 'ffb068' },
            {name:'Green', off: '00a000', hex: '5c9c5c' },
            {name:'Yellow', off: 'ffe800', hex: 'fff26b' },
            {name:'Magenta', off: 'fa0085', hex: 'ff8ac8' },
            {name:'Red', off: 'ff1700', hex: 'ff8b7f' }];
    },
    hasGameStarted: function() {
        return this.gameStarted;
    },
    setGameStarted: function(state) {
        this.gameStarted = state;
    },

    addPlayerToGame : function() {
        var currentConnectedPlayers = this.playersConnected.length;

        if(this.playersConnected.length >= this.minimumUsers ){
            this.startGame();
            return null;
        }

        if(currentConnectedPlayers >= this.playerAvailableColours.length){
               return null;
        } else {
            this.playersConnected[currentConnectedPlayers] = this.playerAvailableColours[currentConnectedPlayers];
            return this.playersConnected[currentConnectedPlayers];
        }
    },

    setSocket: function(socket){
        this.socket = socket;
    },

    assignRandomMagicColour: function (){
        this.magicColour = this.gameAvailableColours.random(this.gameAvailableColours.length);
    },

    startCountDownToGame: function(){

    },

    startGame: function(){

        this.socket.broadcast.emit('startGame',null);
        this.setGameStarted(true);
        this.assignRandomMagicColour();
        console.log(1);
         var colour = this.colorsMod.get().getCIEColor(this.magicColour.hex);
        console.log("3"+colour);
        this.hueMod.changeXY(colour);

       // this.hueMod.changeColours();

//        setTimeout(function(){
//                this.socket.emit('countdown',3);
//                setTimeout(function(){
//                        this.socket.emit('countdown',2);
//                        window.setTimeout(function(){
//                                this.socket.emit('countdown',1);
//                                window.setTimeout(function(){
//                                        this.socket.emit('startGame',null);
//                                        this.gameStarted  = true;
//                                    },
//                                    1000);
//                            },
//                            1000);
//                    },
//                    1000);
//            },
//            1000);
    },


    getPlayers: function(){
        return this.players;
    }
};

module.exports = GameModule;
