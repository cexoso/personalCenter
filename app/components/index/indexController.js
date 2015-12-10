'use strict';
angular.module('controller')
.controller('indexController',['$scope','$http','loading','user',function(s,$http,loading,user){
    s.user=user;
    var notes=[
        {sref:"order",class:'icon_order',name:'我的订单'},
        {sref:"coupons",class:'icon_coupons',name:'我的优惠券'},
        {sref:"myaddr",class:'icon_addr',name:'我的地址'},
        {sref:"cusvice",class:'icon_contact',name:'联系客服'}
        // ,{sref:"cusvice",class:'icon_feedback',name:'意见反馈'}        
    ]
    s.notes=notes;
}]);




