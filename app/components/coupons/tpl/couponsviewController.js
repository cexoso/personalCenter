'use strict';
angular.module('controller')
.controller('couponsviewController',['$scope',function(s){
    var coupons=[
        {
            amount:'30',
            confine:'120',
            deadline:'1442539396955',
            color:'green'
        },
        {
            amount:'30',
            confine:'120',
            deadline:'1452539386955',
            color:'green'
        },
        {
            amount:'50',
            confine:'150',
            deadline:'1442639486955',
            color:'red'
        }
    ]
    s.coupons=coupons;
}]);