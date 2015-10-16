'use strict';
angular.module('controller')
.controller('couponsDialogController',['$scope','dialog','$http','user','$timeout','baseUrl',function(s,dialog,$http,user,$timeout,baseUrl){
    s.clickHandle=function(){
        if(!s.cardCode){
            s.tips="请输入兑换码";
            return;
        }
        s.tips="正在查看兑换码";
        $http.post(baseUrl+'api/coupons/addCustomerCard',{
            cardCode:s.cardCode,
            wxOpenID:user.get('wxOpenid')
        }).success(function(d){
            s.tips=d.msg;
            if(d.code==200){
                $timeout(function(){
                    dialog.close("success");
                },1000);
            }
        }).error(function(d){
            s.tips="d";
        });
    }
    
    
}]);