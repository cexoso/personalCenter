'use strict';
angular.module('controller')
.controller('couponsviewController',['$scope','$http','user','baseUrl',function(s,$http,user,baseUrl){
    s.$watch('active',function(n){
        $http.get(baseUrl+n.url,{
            cache:false,
            params:angular.extend({},{wxOpenid:user.get('wxOpenid')})
        }).success(function(d){
            s.coupons=d.data;
        });    
    });
}]);