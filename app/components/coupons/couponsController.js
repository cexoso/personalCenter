'use strict';
angular.module('controller')
.controller('couponsController',['$scope','ngDialog',function(s,ngDialog){
    var user={};
    user.headimgurl="/images/head.jpg";
    user.nickname='Lucky';
    s.user=user;
    var navBtns=[
        {uiSref:'coupons.couponsview({type:1})',name:'优惠券'},        
        {uiSref:'coupons.couponsview({type:2})',name:'已使用'},
        {uiSref:'coupons.couponsview({type:3})',name:'已过期'}
    ]
    s.exchange=function(){
        var dialog={};
        angular.extend(dialog,ngDialog.open({
            template:'components/coupons/dialog/couponsDialog.html',            
            controller:'couponsDialogController',
            disableAnimation:true,
            showClose:false,
            resolve:{
                dialog:[function(){                    
                    return dialog;
                }]
            }
        }));
        dialog.closePromise.then(function(d){
            console.log(d);
        });
    };    
    s.exchange();
    s.navBtns=navBtns;
}]);