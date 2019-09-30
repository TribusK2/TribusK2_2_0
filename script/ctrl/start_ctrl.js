myApp.controller('startCtrl', ['$scope', '$http', '$timeout', function($scope, $http, $timeout){
    
    // getting data from json file
    $http.get('./data/start.json').then(function(response){
        $scope.textes = response.data.textes;
    });

    // Animation effect on mouse move
    $("body").mousemove(function(e) {
        let mainImage = $('.mainImage');
        let windowWidth = $(window).width();
        let windowHeight = $(window).height();
        let maouseX = (e.pageX-windowWidth/2)/50 + 'px';
        let maouseY = (e.pageY-windowHeight/2)/50 + 'px';
        mainImage.css('background-position-x', maouseX);
        mainImage.css('background-position-y', maouseY);
    });

    // Remove scrolled function of main section
    $scope.$on('$locationChangeStart', function() {
        $('main').removeClass('scrolledView');
    });

}]);