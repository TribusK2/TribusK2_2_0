myApp.controller('portfolioCtrl', ['$scope', '$http', '$timeout', 'isScroll', function($scope, $http, $timeout, isScroll){

    // Getting data from json file
    $http.get('./data/portfolio.json').then(function(response){
        $scope.projects = response.data.projects;
        $scope.textes = response.data.textes;
        $scope.proj = $scope.projects.proj1;
        $scope.main_header = $scope.textes.main_header['0'];
    });

    // Set function to change main display to scrollable or not
    $scope.isScroll = isScroll.isScrollFunction;          //This function is call from custom service "isScroll"


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
        $scope.isScroll();
        desWrapperHeight();
    });

    window.addEventListener("resize", function(){
        $scope.isScroll();
        $timeout(function(){
            desWrapperHeight();
        },1);
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
}]);