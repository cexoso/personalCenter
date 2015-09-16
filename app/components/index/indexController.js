'use strict';
angular.module('controller')
.controller('indexController',['$scope',function(s){
    var user={};
    user.headimgurl="/images/head.jpg";
    user.nickname='Lucky';
    s.user=user;

    var notes=[
        {class:'icon_order',name:'我的订单'},
        {class:'icon_coupons',name:'我的优惠券'},
        {class:'icon_addr',name:'我的地址'},
        {class:'icon_contact',name:'联系客服'},
        {class:'icon_feedback',name:'意见反馈'}
    ]
    s.notes=notes;
}]);