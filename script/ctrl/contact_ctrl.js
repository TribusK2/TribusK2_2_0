myApp.controller('contactCtrl', ['$scope', '$http', '$timeout', 'isScroll', function($scope, $http, $timeout, isScroll){

    // Getting data from json file
    $http.get('./data/contact.json').then(function(response){
        $scope.icons = response.data.icons;
        $scope.textes = response.data.textes;
    });

    // Set function to change main display to scrollable or not
    $scope.isScroll = isScroll.isScrollFunction;          //This function is call from custom service "isScroll"

    // Set function to run on events
    $scope.$on('$viewContentLoaded', function() {
        $scope.isScroll();
    });

    window.addEventListener("resize", function(){
        $scope.isScroll();
    });

    // Toggle text function
    $scope.toggleText = function(){
        let imageContact = $('.imageContact');
        let hidenElement = $('.hidenElement');
        let colapsedImageText = $('#colapsedImageText');
        imageContact.toggleClass('blur');
        if(hidenElement.hasClass('turnOffText')){
            hidenElement.toggleClass('turnOffText');
            $timeout(function(){
                colapsedImageText.toggleClass('hideText');
                hidenElement.toggleClass('hideText');
            }, 1);
        }else{
            hidenElement.toggleClass('hideText');
            colapsedImageText.toggleClass('hideText');
            $timeout(function(){
                hidenElement.toggleClass('turnOffText');
            }, 300); // timeout must be the same as 'transition' on class hidenElement
        }
    }
}]);