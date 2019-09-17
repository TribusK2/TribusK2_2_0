var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate']);

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when("/", {
        templateUrl : "../views/start.html",
        // controller : "startCtrl",
        }
    )
    .when("/offer", {
        templateUrl : "../views/offer.html",
        // controller : "offerCtrl"
        }
    )
    .when("/portfolio", {
        templateUrl : "../views/portfolio.html",
        // controller : "portfolioCtrl"
        }
    )
    .when("/contact", {
        templateUrl : "../views/contact.html",
        // controller : "contactCtrl"
        }
    )
    .otherwise({
        redirectTo: '/'
    });
}]);

myApp.controller('bodyCtrl', ['$scope', '$location', function($scope, $location){
    
    // Active class changed function
    $scope.isActive = function (viewLocation){
        return viewLocation === $location.path();
    };
    // "top scroll" function on click nemu items
    $scope.scrollTop = function(behavior){
        window.scrollTo({
            top: 0,
            behavior: behavior,
        });
        $scope.toggleIcon();
    };

    // Toggle icon of menu button
    $scope.toggleIcon = function(){
        let screenWidth = $(window).width();
        let btnNav = $('.navbar-toggler');
        let bar1 = $('#bar1');
        let bar2 = $('#bar2');
        let bar3 = $('#bar3');
        if (screenWidth < 576){
            if (btnNav.hasClass('collapsed')){
                bar1.addClass('bar1');
                bar2.addClass('bar2');
                bar3.addClass('bar3');
            }else{
                bar1.removeClass('bar1');
                bar2.removeClass('bar2');
                bar3.removeClass('bar3');
            } 
        }else{
            bar1.removeClass('bar1');
            bar2.removeClass('bar2');
            bar3.removeClass('bar3');
        }
    };

    // define height of mainView display when routing <div ng-view>
    $scope.$on('$viewContentLoaded', function() {
        // define height when route is changing
        let mainLeaveHeight = parseFloat($('.mainView:eq(0)').css('height'));   // getting height of animated leave route element
        let mainEnterHeight = parseFloat($('.mainView:eq(1)').css('height') ||  // getting height of animated enter route element
            $('.mainView:eq(0)').css('height'));                                // second element is to prevent undefined bug
        let mainViewHeight = Math.max(mainLeaveHeight, mainEnterHeight);        // gettint the maximum height
        $('.afterSpace').css('height', mainViewHeight);                         // seting right value of height
        
        // define height when route is changed
        let mainView = document.getElementsByClassName('mainView')[0];
        let event = {                                                           // set items to listener
            attributes: true,                                          
            childList: false,
            characterData: false
        };
        let callback = function(){                                              // set function to call when animation finish
            if(!mainView.hasAttribute('data-ng-animate')){
                $('.afterSpace').css('height', mainEnterHeight);
            } 
        }
        let observer = new MutationObserver(callback);                          // set MutationObserver event
        observer.observe(mainView, event);                                      // start MutationObserver event
    });
    
    // define height of mainView display when resizing <div ng-view>
    window.addEventListener("resize", function(){
        let mainView = $('.mainView').css('height');
        $('.afterSpace').css('height', mainView);
    });

}]);
// myApp.controller('startCtrl', ['$scope', function($scope){
//     $scope.$on('$viewContentLoaded', function() {
//         let mainViewHeight = $('#mainView').css('height');
//         console.log(mainViewHeight);
//     });
// }]);

// myApp.controller('offerCtrl', ['$scope', function($scope){
//     $scope.$on('$viewContentLoaded', function() {
//         let mainViewHeight = $('#mainView').css('height');
//         console.log(mainViewHeight);
//     });
// }]);