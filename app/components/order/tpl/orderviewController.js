'use strict';
angular.module('controller')
.controller('orderviewController',['$scope','$stateParams','$interval','$state','$http','user','baseUrl',function(s,$stateParams,$interval,$state,$http,user,baseUrl){
    s.$watch('active',function(){
        $http.get(baseUrl+'api/repair/getRepairOrder',{
            cache:false,
            params:angular.extend({},{wxOpenid:user.get("wxOpenid")},s.active.queryObj)
        }).success(function(d){
            console.log(d.data)
            s.orders=d.data;
        });
    })
    
    s.orderClickHandle=function(e,order){
        var tag=e.target;
        
        if(angular.lowercase(tag.tagName)!=='a'){
            $state.go('orderDetails',order.orderHead);
        }
    }
}]);
