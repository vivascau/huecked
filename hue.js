var HueModule = {
    init : function(hue) {
        this.hue = hue;
    },
    changeColours : function(r_colour, g_colour, b_colour) {
        var self = this;
        this.hue.lights(function(lights){
            for(i in lights) {
                if(lights.hasOwnProperty(i)){
                    self.hue.change(lights[i].set({"on": true, "rgb":[r_colour, g_colour, b_colour]}));
                }
            }
        });
    },
    colourRandomizer : function() {
        Math.floor((Math.random() * 255));
    },
    blink: function(){
        this.changeColours(0,255,30);
    }
};

module.exports= HueModule;