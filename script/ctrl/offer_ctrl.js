"use strict";
myApp.controller('offerCtrl', ['$scope', '$http', '$window', '$timeout', function($scope, $http, $window, $timeout){
    
    // getting data from json file
    $http.get('./data/offer.json').then(function(response){
        $scope.banners = response.data.banners;
        $scope.textes = response.data.textes;
        $scope.logos = response.data.logos;
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
    
    // Animation effect on mouse move
    $("body").mousemove(function(e) {
        let arrowDownButton = $('.arrowDownButton');
        let arrowUpButton = $('.arrowUpButton');
        let maouseX = e.clientX/200 + 'px';
        let maouseY = -e.clientY/100 + 10 + 'px';
        arrowDownButton.css('left', maouseX);
        arrowDownButton.css('bottom', maouseY);
        arrowUpButton.css('left', maouseX);
        arrowUpButton.css('bottom', maouseY);
    });

    // technology animation
    let circle3D = $('.circle3D');
    let techWrapper = $('.techWrapper');
    let radius = 300;                       // Circle radius (px)
    let alfa = 45;                          // Distance angle between elements (deg)
    let beta;                               // Elements angle position on circle
    let proportion = 4;
    let b = radius/proportion + 60;         // Circle midpoint y position (px)
    let move = setInterval(() => {
        let cardWrapper = $('.cardWrapper');
        let cardWrapperW = cardWrapper.width();
        let cardWrapperH = cardWrapper.height();
        let windowWidth = $(window).width();
        let a = windowWidth/2;                  // Circle midpoint x position (px). Iside interval becouse of resizing screen.
        (beta < 360) ? beta += .1 : beta = 0;  // Move defined
        for (let i=0; i < cardWrapper.length; i++){
            let anglePosition = i*alfa + beta;
            let posAbsX = Math.round(radius * (Math.cos(i*alfa*Math.PI / 180 + beta*Math.PI / 180)));
            let posAbsY = Math.round(radius * (Math.sin(i*alfa*Math.PI / 180 + beta*Math.PI / 180)))/proportion;

            cardWrapper[i].posx = posAbsX + a - cardWrapperW/2 + 'px';
            cardWrapper[i].posy = posAbsY + b - cardWrapperH/2 + 'px';
            
            // Settings for correct display order of cards
            if(anglePosition > 337.5+360 || anglePosition <= 22.5){
                cardWrapper[i].style.zIndex = 3;
            }else if(anglePosition > 22.5 && anglePosition <= 67.5){
                cardWrapper[i].style.zIndex = 4;
            }else if(anglePosition > 67.5 && anglePosition <= 112.5){
                cardWrapper[i].style.zIndex = 5;
            }else if(anglePosition > 112.5 && anglePosition <= 157.5){
                cardWrapper[i].style.zIndex = 4;
            }else if(anglePosition > 157.5 && anglePosition <= 202.5){
                cardWrapper[i].style.zIndex = 3;
            }else if(anglePosition > 202.5 && anglePosition <= 247.5){
                cardWrapper[i].style.zIndex = 2;
            }else if(anglePosition > 247.5 && anglePosition <= 292.5){
                cardWrapper[i].style.zIndex = 1;
            }else if(anglePosition > 292.5 && anglePosition <= 337.5){
                cardWrapper[i].style.zIndex = 2;
            }else if(anglePosition > 337.5 && anglePosition <= 22.5+360){
                cardWrapper[i].style.zIndex = 3;
            }else if(anglePosition > 22.5+360 && anglePosition <= 67.5+360){
                cardWrapper[i].style.zIndex = 4;
            }else if(anglePosition > 67.5+360 && anglePosition <= 112.5+360){
                cardWrapper[i].style.zIndex = 5;
            }else if(anglePosition > 112.5+360 && anglePosition <= 157.5+360){
                cardWrapper[i].style.zIndex = 4;
            }else if(anglePosition > 157.5+360 && anglePosition <= 202.5+360){
                cardWrapper[i].style.zIndex = 3;
            }else if(anglePosition > 202.5+360 && anglePosition <= 247.5+360){
                cardWrapper[i].style.zIndex = 2;
            }else if(anglePosition > 247.5+360 && anglePosition <= 292.5+360){
                cardWrapper[i].style.zIndex = 1;
            }else if(anglePosition > 292.5+360 && anglePosition <= 337.5+360){
                cardWrapper[i].style.zIndex = 2;
            }
            cardWrapper[i].style.left = cardWrapper[i].posx;
            cardWrapper[i].style.top = cardWrapper[i].posy;
            let persective = 2;                                 //Perspective of 3D effect
            let scale = (Math.sin(anglePosition*Math.PI / 180)+persective)/(persective+1);
            cardWrapper[i].style.transform = 'scale('+scale+')';           
        }
        
        // Settings of circle and wrapper parameters
        circle3D[0].style.width = radius*2 + 'px';
        circle3D[0].style.height = radius*2/proportion + 'px';
        circle3D[0].style.borderRadius = radius*proportion + 'px /' + radius + 'px';
        circle3D[0].style.top = b - radius/proportion  + 'px';
        techWrapper[0].style.height = b*2 + 'px';
    }, 1);
    
    $scope.$on('$locationChangeStart', function() {
        clearInterval(move);
        $('main').removeClass('scrolledView');
    });
    
}]);