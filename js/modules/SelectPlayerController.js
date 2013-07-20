app.controller('SelectPlayersController', ['$scope', '$location', '$timeout', 'PlayersService',
    function ($scope, $location, $timeout, PlayersService) {
        console.log("SelectPlayersController");


        var colors = [
            {name:'Cyan', off: '00ffff', hex: 'a9ffff' },
            {name:'Silver', off: 'bcbcbc', hex: '999999' },
            {name:'Grey', off: '565656', hex: '333333' },
            {name:'Blue', off: '005dff', hex: '4c8cfc' },
            {name:'Orange', off: 'ff7900', hex: 'ffb068' },
            {name:'Green', off: '00a000', hex: '5c9c5c' },
            {name:'Yellow', off: 'ffe800', hex: 'fff26b' },
            {name:'Magenta', off: 'fa0085', hex: 'ff8ac8' },
            {name:'Red', off: 'ff1700', hex: 'ff8b7f' }];

        $scope.colors = colors;

        function countSelectedColors(){
            var counter = 0;
            for(var i = 0; i< colors.length; i++){
                var color = colors[i];
                if(color.selected == true){
                    counter++;
                }
            }

            return counter;

        }

        $scope.clickColor = function(color){
            console.log('clicked color: '+color.color);

            if(color.selected == true){
                // deselect
                color.id = undefined;
            }else{
                // select
                color.id = countSelectedColors();
            }

            color.selected= !color.selected;

        }

        $scope.startGame = function(){

        }

    }]);