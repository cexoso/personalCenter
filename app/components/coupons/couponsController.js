'use strict';
angular.module('controller')
.controller('couponsController',['$scope','ngDialog','$http','$state','user',function(s,ngDialog,$http,$state,USER){
    var user={};    
    user.headimgurl=USER.get("wxHeadImage");
    user.nickname=USER.get("wxNickName");
    s.user=user;
    var navBtns=[
        {url:'api/coupons/getCustomerCoupons',name:'优惠券'},        
        {url:'api/coupons/getUsedCoupons',name:'已使用'},
        {url:'api/coupons/getExpireCoupons',name:'已过期'}
    ]
    s.navClickHandle=function(nav){
        s.active=nav;
    }
    s.active=navBtns[0];
    var dialog={};
    s.exchange=function(){
        angular.extend(dialog,ngDialog.open({
            template:'components/coupons/dialog/couponsDialog.html',                
            controller:'couponsDialogController',
            disableAnimation:true,
            showClose:false,      
            overlay:false,
            resolve:{
                dialog:[function(){                    
                    return dialog;
                }]
            }
        }));        
        dialog.closePromise.then(function(d){            
            if(d.value=="success"){
                $state.reload();
            }
        },function(d){
        });
    };        
    s.navBtns=navBtns;
    s.$on('$destroy',function(a){        
        dialog.close&&dialog.close();
    })
}]);