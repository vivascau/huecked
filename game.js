var GameModule = {



    init : function(hueMod, colorsMod) {
        this.hueMod = hueMod;
        this.colorsMod = colorsMod;

        this.gameStarted = false;
        this.minimumUsers = 3;
        this.playersConnected = [];
        this.magicColour = null;

        this.playerAvailableColours = [
            {name:'Blue', off: '005dff', hex: '4c8cfc' },
            {name:'Orange', off: 'ff7900', hex: 'ffb068' },
            {name:'Green', off: '00a000', hex: '5c9c5c' },
            {name:'Cyan', off: '00ffff', hex: 'a9ffff' },
            {name:'Silver', off: 'bcbcbc', hex: '999999' },
            {name:'Grey', off: '565656', hex: '333333' },
            {name:'Yellow', off: 'ffe800', hex: 'fff26b' },
            {name:'Magenta', off: 'fa0085', hex: 'ff8ac8' },
            {name:'Red', off: 'ff1700', hex: 'ff8b7f' }];

        this.gameAvailableColours = [
            //{name:'Cyan', off: '00ffff', hex: 'a9ffff' },
            //{name:'Silver', off: 'bcbcbc', hex: '999999' },
//            {name:'Grey', off: '565656', hex: '333333', "hue":0 },


            {name:'Blue', off: '005dff', hex: '0000ff',"hue": 46920, "xy":[0.167, 0.040]},
//            {name:'Orange', off: 'ff7900', hex: 'ffb068', "hue": 12750 },
            {name:'Green', off: '00a000', hex: '00ff00' , "hue": 36210, "xy":[0.220, 0.075]},
            {name:'Yellow', off: 'ffe800', hex: 'ffffe0', "hue": 12750, "xy":[0.515, 0.440]},
            {name:'Magenta', off: 'fa0085', hex: 'ff8ac8', "hue": 56100 , "xy":[0,421, 0.181]},
            {name:'Red', off: 'ff1700', hex: 'ff0000', "hue": 0, "xy":[0.675, 0.322]}];
    },
    hasGameStarted: function() {
        return this.gameStarted;
    },
    setGameStarted: function(state) {
        this.gameStarted = state;
    },

    getMagicColour : function(){
      return this.magicColour;
    },

    addPlayerToGame : function() {
        var currentConnectedPlayers = this.playersConnected.length;

         if(currentConnectedPlayers >= this.playerAvailableColours.length){
               return null;
        } else {
             var newPlayer = this.playerAvailableColours[currentConnectedPlayers];
             this.playersConnected[currentConnectedPlayers] = newPlayer;
             this.hueMod.blink(this.colorsMod.get().getCIEColor(newPlayer.hex));
            return this.playersConnected[currentConnectedPlayers];
        }
    },

    setSocket: function(socket){
        this.socket = socket;
    },

    drawRandomMagicColour: function (){

        var randomIndex = Math.floor(Math.random() * (this.gameAvailableColours.length + 1)) + 0;

        var drawnColor = this.gameAvailableColours[randomIndex];
        this.gameAvailableColours.splice(randomIndex, 1);


        console.log('MAGIC COLOR='+JSON.stringify(drawnColor));

        if(!drawnColor)  {
               drawnColor = this.gameAvailableColours[2];
               this.gameAvailableColours.splice(2, 1);

        }

        this.magicColour = drawnColor;


        //this.magicColour = this.gameAvailableColours.random(this.gameAvailableColours.length);
    },

    pushMagicColour: function() {
        this.gameAvailableColours.push(this.magicColour);
    },

    startCountDownToGame: function(){

    },

    canStartGame:function(){
        return this.playersConnected.length === this.minimumUsers;
    },

    startGame: function(){

        var self = this;
        var cycles = 0;

        self.whenMagicColorDrawn = undefined;

        var drawColor = function() {
            cycles++;
            if(cycles === 3){
                 self.pushMagicColour();
            }


            var randomIndex = Math.floor(Math.random() * (self.gameAvailableColours.length)) + 0;

            console.log('COLOR GOING TO BE DRAWN (cycle='+cycles+
                ',randomindex='+randomIndex+', lenght='+self.gameAvailableColours.length+', ' +
                'colors='+JSON.stringify(self.gameAvailableColours)+')')

            var drawnColor = self.gameAvailableColours[randomIndex];
            // TODO understand btter way
            return drawnColor;

        }

        var drawAndShowColorWithTimeout = function() {
            setTimeout(function(){
                var color = drawColor();

                console.log('DRAWN COLOR: '+JSON.stringify(color));

                var hueColour = color.xy;
                self.hueMod.changeXY(hueColour, color.hue);

                // loop

                if(color == self.magicColour){
                    console.log('FINISH!!!');
                    self.whenMagicColorDrawn = new Date();
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
            console.log('drawn magic color= '+JSON.stringify(self.magicColour) + " ;; " + self.getMagicColour());

            var colour = self.magicColour.xy;
            console.log("3"+colour);

            self.hueMod.changeXY(colour, colour.hue);

                setTimeout(function(){
                      //self.hueMod.turnOFF();
                    drawAndShowColorWithTimeout();
                }, 5000);

        }, 2000);

    },


    getPlayers: function(){
        return this.players;
    }
};

module.exports = GameModule;
