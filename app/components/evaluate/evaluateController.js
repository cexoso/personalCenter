'use strict';
angular.module('controller')
.controller('evaluateController',['$scope',function(s){
    
}]);
angular.module('directive')
.directive('evaluateStar',[function(){
     return{
        restrict:"A",        
        replace:true,
        templateUrl:"components/evaluate/tpl/evaluateStar.html",
        link:function(s,e,a,c){
            console.log(s);
            console.log(e);
            console.log(a);
            console.log(c);
        }
    }
}]);