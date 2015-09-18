'use strict';
angular.module('controller')
.controller('myaddrController',['$scope',function(s){
    var addrs=[
        {
            name:'张三',
            tel:'13100000000',
            addr:'广东省深圳市华侨城创意文化园a3栋208c',
            "default":true    
        },
        {
            name:'李四',
            tel:'13100000000',
            addr:'广东省深圳市华侨城创意文化园a3栋208c',
            "default":false   
        },
        {
            name:'王五',
            tel:'13100000000',
            addr:'广东省深圳市华侨城创意文化园a3栋208c',
            "default":false   
        }
    ];
    s.addrs=addrs;
}]);