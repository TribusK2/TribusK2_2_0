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
        controller : "offerCtrl"
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

myApp.controller('bodyCtrl', ['$scope', '$location', '$document', '$window', '$timeout', function($scope, $location, $document, $window, $timeout){
    
    // Change header height function 
    $document.on('scroll', function() {
        let currentScroll = $window.scrollY;
        let logo = $('#logo');
        let navbarNav = $('#navbarNav');
        let beforeSpace = $('.beforeSpace');
        let logoLink = $('#logoLink');
        let nav = $('nav');
        if (currentScroll > 0){
            logo.css('height', '38px');
            logoLink.css('padding', '8px');
            navbarNav.css('padding-top', '0px');
            beforeSpace.css('height', '56px');
            nav.css('padding-top', '8px');
        } else {
            logo.css('height', '60px');
            logoLink.css('padding', '16px');
            navbarNav.css('padding-top', '24px');
            beforeSpace.css('height', '92px');
            nav.css('padding-top', '16px');
        }
    });

    // Active class changed function
    $scope.isActive = function (viewLocation){
        return viewLocation === $location.path();
    };

    // "Top scroll" function on click nemu items
    $scope.scrollTop = function(behavior, bool){
        window.scrollTo({
            top: 0,
            behavior: behavior,
        });
        if (bool){
            $scope.toggleIcon();
        }
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

    // Define height of mainView display when routing <div ng-view>
    $scope.$on('$viewContentLoaded', function() {
        $timeout(function() {                                                       // ste timeout to run function in next digest cycle, after image css loaded
            // Define height when route is changing
            let mainLeaveHeight = parseFloat($('.mainView:eq(0)').css('height'));   // getting height of animated leave route element
            let mainEnterHeight = parseFloat($('.mainView:eq(1)').css('height') ||  // getting height of animated enter route element
                $('.mainView:eq(0)').css('height'));                                // second element is to prevent undefined bug
            
            let mainViewHeight = Math.max(mainLeaveHeight, mainEnterHeight);        // gettint the maximum height
            $('.afterSpace').css('height', mainViewHeight);                         // seting right value of height
            
            // Define height when route is changed
            let mainView = document.getElementsByClassName('mainView')[0];
            // console.log(mainView);
            let event = {                                                           // set items to listener
                attributes: true,                                          
                childList: false,
                characterData: false
            };
            let callback = function(){                                              // set function to call when animation finish
                let mainViewHeight = $('.mainView').css('height');
                $('.afterSpace').css('height', mainViewHeight); 
            }
            let observer = new MutationObserver(callback);                          // set MutationObserver event
            observer.observe(mainView, event);                                      // start MutationObserver event
        },100);                                                                       // setting of timeout miliseconds delay
    });
    
    // Define height of mainView display when resizing <div ng-view>
    window.addEventListener("resize", function(){
        let mainViewHeight = $('.mainView').css('height');
        $('.afterSpace').css('height', mainViewHeight);
    });

}]);
// myApp.controller('startCtrl', ['$scope', function($scope){
//     $scope.$on('$viewContentLoaded', function() {
//         let mainViewHeight = $('#mainView').css('height');
//         console.log(mainViewHeight);
//     });
// }]);

myApp.controller('offerCtrl', ['$scope', '$http', '$window', function($scope, $http, $window){
    
    // getting data from json file
    $http.get('./data/offer.json').then(function(response){
        $scope.banners = response.data;
    });

    // Define rules of class bannerBackgroundLeft and bannerBackgroundRight display when route loading
    $scope.$on('$viewContentLoaded', function() {
        let screenWidth = $window.innerWidth;
        if(screenWidth >= 768){
            $scope.visible = false;
        }else{
            $scope.visible = true;
        }
    });

    // Define rules of class bannerBackgroundLeft and bannerBackgroundRight display when resizing
    window.addEventListener("resize", function(){
        let screenWidth = $window.innerWidth;
        if(screenWidth >= 768){
            $scope.$apply($scope.visible = false);
        }else{
            $scope.$apply($scope.visible = true);
        }
    });

    // 
    $scope.bannerMore = function(){
        let thisBanner = $('.bannerMore');
        console.log(thisBanner);
        thisBanner.css('height', '100%');
    }
}]);