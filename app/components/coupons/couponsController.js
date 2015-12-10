'use strict';
angular.module('controller')
.controller('couponsController',['$scope','$http','$state','user','baseUrl','loading','$q',function(s,$http,$state,user,baseUrl,loading,$q){    
    var navBtns=[
        {url:'api/coupons/getCustomerCoupons',name:'未使用'},        
        {url:'api/coupons/getUsedCoupons',name:'已使用'},
        {url:'api/coupons/getExpireCoupons',name:'已过期'}
    ]
    s.navClickHandle=function(nav){
        s.active=nav;
    }
    console.log($q)
    s.active=navBtns[0];
    var dialog={};
    s.exchange=function(){
        if(!s.cardCode){
            alert("请输入兑换码");
            return;
        }
        loading.show();
        $http.post(baseUrl+'api/coupons/addCustomerCard',{
            cardCode:s.cardCode,
            wxOpenID:user.get('wxOpenid')
        }).success(function(d){            
            alert(d.msg);
            $state.reload();
        }).finally(function(d){            
            loading.hide();
        })
    };    
    s.navBtns=navBtns;    
}]);