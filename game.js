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
            //{name:'Cyan', off: '00ffff', hex: 'a9ffff' },
            //{name:'Silver', off: 'bcbcbc', hex: '999999' },
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

    drawRandomMagicColour: function (){

        var randomIndex = Math.floor(Math.random() * (this.gameAvailableColours.length + 1)) + 0;

        var drawnColor = this.gameAvailableColours.splice(randomIndex, 1)[0];

        console.log('MAGIC COLOR='+JSON.stringify(drawnColor));

        this.magicColour = drawnColor;


        //this.magicColour = this.gameAvailableColours.random(this.gameAvailableColours.length);
    },

    pushMagicColour: function() {
        this.gameAvailableColours.push(this.magicColour);
    },

    startCountDownToGame: function(){

    },

    startGame: function(){

        var self = this;
        var cycles = 0;

        var drawColor = function() {
            cycles++;
            if(cycles === 3){
                 self.pushMagicColour();
            }


            var randomIndex = Math.floor(Math.random() * (self.gameAvailableColours.length)) + 0;

            console.log('COLOR GOING TO BE DRAWN (cycle='+cycles+',randomindex='+randomIndex+', lenght='+self.gameAvailableColours.length+', colors='+JSON.stringify(self.gameAvailableColours)+')')

            var drawnColor = self.gameAvailableColours[randomIndex];
            // TODO understand btter way
            return drawnColor;

        }

        var drawAndShowColorWithTimeout = function() {
            setTimeout(function(){
                var color = drawColor();

                console.log('DRAWN COLOR: '+JSON.stringify(color));

                var hueColour = self.colorsMod.get().getCIEColor(color.hex);
                self.hueMod.changeXY(hueColour);

                // loop

                if(color == self.magicColour){
                    console.log('FINISH!!!');
                }else{
                    console.log('CONTINUE...');
                    drawAndShowColorWithTimeout();
                }

             },2000)
        }

        setTimeout(function(){

            self.socket.broadcast.emit('startGame',null);
            self.setGameStarted(true);
            self.drawRandomMagicColour();
            console.log('drawn magic color= '+JSON.stringify(self.magicColour));

            var colour = self.colorsMod.get().getCIEColor(self.magicColour.hex);
            console.log("3"+colour);

            self.hueMod.changeXY(colour);

                setTimeout(function(){
                      self.hueMod.turnOFF();
                    drawAndShowColorWithTimeout();
                }, 5000);

        }, 2000);


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
