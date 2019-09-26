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
        controller : "portfolioCtrl"
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
        },1);
    });
    window.addEventListener("scroll", function(){
        $timeout(function(){
            mainHeighFunction();
        },500);
    });

}]);

myApp.controller('offerCtrl', ['$scope', '$http', '$window', function($scope, $http, $window){
    
    // getting data from json file
    $http.get('./data/offer.json').then(function(response){
        $scope.banners = response.data.banners;
        $scope.textes = response.data.textes;
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

    // Open banner
    $scope.openBanner = function(index){
        let thisBanner = $('.bannerMore')[index];
        thisBanner.style.height = '94%';
    }

    // Close banner
    $scope.closeBanner = function(index){
        let thisBanner = $('.bannerMore')[index];
        thisBanner.style.height = '0%';
    }

    // Navigation arrow
    $scope.scrollBtn = function(pos){
        let currScroll = window.scrollY;
        let windowHeight = window.innerHeight - 100;
        if(pos == 'up'){
            window.scrollTo({
                top: currScroll - windowHeight,
                behavior: "smooth",
            });
        }else if(pos == 'down'){
            window.scrollTo({
                top: currScroll + windowHeight,
                behavior: "smooth",
            });
        }   
    }
}]);

myApp.controller('portfolioCtrl', ['$scope', '$http', '$window', '$timeout', function($scope, $http, $window, $timeout){

    // Getting data from json file
    $http.get('./data/portfolio.json').then(function(response){
        $scope.projects = response.data.projects;
        $scope.textes = response.data.textes;
        $scope.proj = $scope.projects.proj1;
        $scope.main_header = $scope.textes.main_header['0'];
    });

    // Set function to change main display to scrollable or not
    let isScroll = function(){
        let main = $('main');
        let screenWidth = $window.innerWidth;
        let screenHeight = $window.innerHeight;
        if(screenWidth < 992 && screenHeight < 1500){
            main.addClass('scrolledView');
        }else{
            main.removeClass('scrolledView');
        }
    }

    // Set height of descriptionWrapper
    let desWrapperHeight = function(){
        let headerWrapperHeight = parseFloat($('.headerWrapper').css('height'));
        let descriptionWrapper = $('.descriptionWrapper');
        let presentRealisationHeight = parseFloat($('.presentRealisation').css('height'));
        let descriptionWrapperHeight = presentRealisationHeight - headerWrapperHeight -2;
        descriptionWrapper.css('height', descriptionWrapperHeight+'px');
    }

    // Set function to run on events
    $scope.$on('$viewContentLoaded', function() {
        isScroll();
        desWrapperHeight();
    });

    window.addEventListener("resize", function(){
        isScroll();
        desWrapperHeight();
    });

    // Animate function to change arrow button
    $scope.changeArrow = function(direction){
        let change = $('.changeWrapper');
        let a1 = -1;
        let b1 = 0;
        let speed = 0.04;
        let interval = 1;
        let num = 1;
        let currentProj = $scope.proj;
        let headerAnimMove = '10px';
        let realisationHeader = $('.realisationHeader');
        
            // Define current display projects
            switch(currentProj){
                case $scope.projects.proj1:
                    num = 1;
                    break;
                case $scope.projects.proj2:
                    num = 2;
                    break;
                case $scope.projects.proj3:
                    num = 3;
                    break;
            }

            // Set action to left arrow
            if(direction == 'left'){
                // Header animation
                realisationHeader.animate({
                    opacity: 0,
                    left: headerAnimMove,
                    }, 0, function(){
                        realisationHeader.animate({
                            opacity: 1,
                            left: '0px'
                    }, 400)
                });
                
                // Arrows animtion
                if(num > 1){
                    num -= 1;
                }else{
                    num = 3;
                }
                let anim = setInterval(frame, interval);
                function frame() {
                    if (a1 >= 1) {
                    clearInterval(anim);
                    } else {
                        if(a1 > 0){
                        b1 = a1-1; 
                        }else{
                            b1 = -1+Math.abs(a1);
                        }
                        a1 += speed;
                        change.css('transform', 'matrix3d('+a1+', 0, '+b1+', 0, 0, 1, 0, 0, 1.22465e-16, 0, '+a1+', 0, 0, 0, 0, 1)');
                    }
                }

            // Set action to right arrow
            }else if(direction == 'right'){
                // Header animation
                realisationHeader.animate({
                    opacity: 0,
                    left: '-'+headerAnimMove
                    }, 0, function(){
                        realisationHeader.animate({
                            opacity: 1,
                            left: '0px'
                    }, 400)
                });

                // Arrows animtion
                if(num < 3){
                    num += 1;
                }else{
                    num = 1;
                }
                let anim = setInterval(frame, interval);
                function frame() {
                    if (a1 >= 1) {
                    clearInterval(anim);
                    } else {
                        if(a1 > 0){
                            b1 = 1-Math.abs(a1);
                        }else{
                            b1 = a1+1;
                        }
                        a1 += speed;
                        change.css('transform', 'matrix3d('+a1+', 0, '+b1+', 0, 0, 1, 0, 0, 1.22465e-16, 0, '+a1+', 0, 0, 0, 0, 1)');
                    }
                }
            }

            // Set new current display
            switch(num){
                case 1:
                    $scope.proj = $scope.projects.proj1;
                    $scope.main_header = $scope.textes.main_header['0'];
                    break;
                case 2:
                    $scope.proj = $scope.projects.proj2;
                    $scope.main_header = $scope.textes.main_header['1'];
                    break;
                case 3:
                    $scope.proj = $scope.projects.proj3;
                    $scope.main_header = $scope.textes.main_header['2'];
                    break;
                default:
                    $scope.projects = $scope.projects1;
                    $scope.main_header = $scope.textes.main_header['0'];
            }
           
        // Close current display box
        $scope.closeRealisation();
        desWrapperHeight();

        $timeout(function(){
            let mainViewHeight = parseFloat($('.mainView').css('height'));
        $('.afterSpace').css('height', mainViewHeight + "px");
        },1);
    }

    // Display direct realisation
    $scope.displayRealisation = function(){
        let presentRealisation = $('.presentRealisation');
        let realisationExample = $('.realisationExample');
        presentRealisation.css({
            'opacity': '1',
            'top': '-80px'
        });
        realisationExample.css({
            'height': '20%',
            'top': '70%'
        });
        $scope.file_name = this.project.file_name;
        $scope.title = this.project.title;
        $scope.industry = this.project.industry;
        $scope.web1_link = this.project.web1_link;
        $scope.web1 = this.project.web1;
        if($scope.web1_link === ''){
            $('.webPage1').css({display: 'none'});
        }else{
            $('.webPage1').css({display: 'block'});
        }
        $scope.web2_link = this.project.web2_link;
        $scope.web2 = this.project.web2;
        if($scope.web2_link === ''){
            $('.webPage2').css({display: 'none'});
        }else{
            $('.webPage2').css({display: 'block'});
        }
        $scope.description = this.project.description;
        $timeout(function(){
            desWrapperHeight();
        }, 1);
    }

    // Close display direct realisation
    $scope.closeRealisation = function(){
        let presentRealisation = $('.presentRealisation');
        let realisationExample = $('.realisationExample');
        presentRealisation.css({
            'opacity': '0',
            'top': '-170px'
        });
        realisationExample.css({
            'height': '50%',
            'top': '0%'
        });
    }

    // // Define display "scrolledView" class function
    // let setScrollClass = function(){
    //     let screenWidth = $window.innerWidth;
    //     if(screenWidth < 992){
    //         $scope.isScrolled = true;
    //     }else{
    //         $scope.isScrolled = false;
    //     }
    // }
    // // Define event to seting scrolledView
    // let mainHeighFunction = function(){
    //     let mainViewHeight = parseFloat($('.mainView').css('height'));
    //     $('.afterSpace').css('height', mainViewHeight + "px");
    // }
    // window.addEventListener("resize", function(){
    //     $timeout(function() {
    //         setScrollClass();
    //         mainHeighFunction();
    //     },1);
    // }); 
    // window.addEventListener("scroll", function(){
    //     $timeout(function() {
    //         setScrollClass();
    //         mainHeighFunction();
    //     },1);
    // });
    // $scope.$on('$viewContentLoaded', function(){
    //     $timeout(function() {
    //         setScrollClass();
    //         mainHeighFunction();
    //     },1);
    // });

}]);