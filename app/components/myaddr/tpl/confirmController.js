'use strict';
angular.module('controller')
.controller('confirmController',['$scope','dialog',function(s,dialog){
    s.ok=function(){
        dialog.close("ok");
    }
    s.cancel=function(){
        dialog.close("cancel");
    }
}]);