var HueModule = {
    init : function(hue) {
        this.hue = hue;
        this.bri =  200;
    },
    changeColours : function(r_colour, g_colour, b_colour) {
        var self = this;
        this.modifyHue({"on": true, "rgb":[r_colour, g_colour, b_colour], "bri":this.bri});
    },
    changeXY : function(colArray, hue) {
        this.modifyHue({"on": true, "xy":colArray, "bri":this.bri, "hue":hue});
    },
    colourRandomizer : function() {
        Math.floor((Math.random() * 255));
    },
    blink: function(){
        this.modifyHue({"on": false, "alert": "select" });

    },
    turnOFF: function(){
        this.modifyHue({"on": false});

    },
    resetHUE: function(callback){
        this.modifyHue({
                        "on": false,
                            "bri": 0,
                            "hue": 0,
                            "sat": 0,
                            "xy": [
                            1,
                            1
                        ],
                            "ct": 0,
                            "alert": "none",
                            "effect": "none",
                            "colormode": "hs",
                            "reachable": true
                    });
    },

    modifyHue: function(JSON){
        var self = this;


        var displayResult = function(result) {
            console.log(result);
        };

        var displayError = function(err) {
            console.error(err);
        };

        this.hue.setLightState(1, JSON); // provide a value of false to turn off
        this.hue.setLightState(3, JSON); // provide a value of false to turn off

//        this.hue.lights(function(lights){
//            for(i in lights)
//                if(i !== "1" &&  lights.hasOwnProperty(i))
//                    self.hue.change(lights[i].set(JSON));
//        });
    }
};

module.exports= HueModule;