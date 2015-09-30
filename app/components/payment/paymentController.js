'use strict';
angular.module('controller')
.controller('paymentController',['$scope','order',function(s,order){
    s.order={
        usercity:'深圳',
        userarea:'南山区',
        useraddr:'华侨城创意文化园a3栋208c',
        username:'李小龙',
        userPhone:'13333333333',
        trouble_desc:'苹果 Iphone6 金色 wifi故障',
        orderid:'112103087689',
        status:2,
        price:1243
    };
    s.coupons = [
      {
        id: '00001',
        name: '100'
      },
      {
        id: '00002',
        name: '200'
      },
      {
        id: '00003',
        name: '300'
      },
      {
        id: '00004',
        name: '400'
      }
    ];
}]);