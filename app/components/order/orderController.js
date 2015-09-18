'use strict';
angular.module('controller')
.controller('orderController',['$scope',function(s){
    var user={};
    user.headimgurl="/images/head.jpg";
    user.nickname='Lucky';
    s.user=user;
    var navBtns=[
        {uiSref:'order.orderview({type:1})',name:'当前订单'},        
        {uiSref:'order.orderview({type:2})',name:'已完成'}
    ]
    s.navBtns=navBtns;
}]);
