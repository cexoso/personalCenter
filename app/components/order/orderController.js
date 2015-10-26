'use strict';
angular.module('controller')
.controller('orderController',['$scope','user',function(s,USER){
    var user={};
    user.headimgurl=USER.get("wxHeadImage");
    user.nickname=USER.get("wxNickName");
    s.user=user;
    var navBtns=[
        {
            queryObj:{
                isFinish:'0'
            },
            name:'当前订单'
        },
        {
            queryObj:{
                isFinish:'1'
            },
            name:'已完成'
        }
    ]
    s.navBtns=navBtns;
    s.navClickHandle=function(nav){
        s.active=nav;
    }
    s.active=navBtns[0];
}]);
