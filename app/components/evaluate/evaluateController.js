'use strict';
angular.module('controller')
.controller('evaluateController',['$scope','$timeout',function(s,$timeout){
    s.evaluateStar=3;
}]);
angular.module('directive')
.directive('evaluateStar',[function(){
     return{
        restrict:"A",        
        replace:true,
        require:"?ngModel",
        templateUrl:"components/evaluate/tpl/evaluateStar.html",
        link:function(s,ele,a,c){
            var star_count=a.evaluateStar;
            var root=angular.element(ele);
            var starArr=[];
            for(var i=0;i<star_count;i++){
                var e=angular.element(document.createElement('span'));
                e.addClass('star');
                e.attr('star_index',i+1);
                root.append(e);
                starArr.push(e);
                e.on('click',star_click_handle);
            }
            function star_click_handle(e){
                if(a.disabled!==undefined){
                    return;
                };
                var current_index=angular.element(e.target).attr('star_index');
                c&&c.$setViewValue(+current_index);
                render(current_index);
            }
            function render(current_index){
                angular.element(document.querySelectorAll(".star","[evaluateStar]")).removeClass("active");
                for(var i=0,length=starArr.length;i<length;i++){
                    var _this=angular.element(starArr[i]);
                    if(+_this.attr('star_index')<=+current_index){
                        _this.addClass("active");                        
                    }else{
                        break;
                    }
                }
            }
            if(c){
                s.$watch(a.ngModel,function(n){
                    render(n)
                });
            }
        }
    }
}]);