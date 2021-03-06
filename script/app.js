"use strict";
var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate']);

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when("/", {
        templateUrl : "../views/start.html",
        controller : "startCtrl",
        }
    )
    .when("/offer", {
        templateUrl : "../views/offer.html",
        controller : "offerCtrl"
        }
    )
    .when("/portfolio", {
        templateUrl : "../views/portfolio.html",
        controller : "portfolioCtrl"
        }
    )
    .when("/contact", {
        templateUrl : "../views/contact.html",
        controller : "contactCtrl"
        }
    )
    .otherwise({
        redirectTo: '/'
    });
}]);

myApp.service('isScroll', ['$window', function($window){
    
    // Set function to change main display to scrollable or not
    this.isScrollFunction = function(a){
        a;
        let main = $('main');
        let screenWidth = $window.innerWidth;
        let screenHeight = $window.innerHeight;
        if(!main.hasClass('scrolledView')){
            if(screenWidth < 992 && screenHeight < 1500 || screenHeight < 700){
                main.addClass('scrolledView');
            }else{
                main.removeClass('scrolledView');
            }
        }
    }
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
            $('.afterSpace').css('height', mainViewHeight + "px");                  // seting right value of height
                      
            // Define height when route is changed
            let mainView = document.getElementsByClassName('mainView')[0];
            let event = {                                                           // set items to listener
                attributes: true,                                          
                childList: false,
                characterData: false
            };
            let callback = function(){                                              // set function to call when animation finish
                let mainViewHeight = parseFloat($('.mainView').css('height'));
                $('.afterSpace').css('height', mainViewHeight + "px");
            }
            let observer = new MutationObserver(callback);                          // set MutationObserver event
            observer.observe(mainView, event);                                      // start MutationObserver event
        },1);                                                                     // setting of timeout miliseconds delay
    });
    
    // Define "mainViewHeight" change function
    let mainHeighFunction = function(){
        let mainViewHeight = parseFloat($('.mainView').css('height'));
        $('.afterSpace').css('height', mainViewHeight + "px");
    }
    
    // Define event to seting mainViewHeight
    window.addEventListener("resize", function(){
        $timeout(function(){
            mainHeighFunction();
        },500);
    });
    window.addEventListener("scroll", function(){
        $timeout(function(){
            mainHeighFunction();
        },500);
    });
    
}]); 