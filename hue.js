var HueModule = {
    init : function(hue) {
        this.hue = hue;
    },
    changeColours : function(r_colour, g_colour, b_colour) {
        this.hue.lights(function(lights){
            for(i in lights) {
                if(lights.hasOwnProperty(i)){
                    this.hue.change(lights[i].set({"on": false, "rgb":[r_colour, g_colour, b_colour]}));
                }
            }
        });
    },
    colourRandomizer : function() {
        Math.floor((Math.random() * 255));
    }
};

module.exports = HueModule;