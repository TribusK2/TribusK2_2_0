myApp.controller('contactCtrl', ['$scope', '$http', '$timeout', function($scope, $http, $timeout){

    // Getting data from json file
    $http.get('./data/contact.json').then(function(response){
        $scope.icons = response.data.icons;
        $scope.textes = response.data.textes;
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