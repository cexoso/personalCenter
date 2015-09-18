'use strict';
angular.module('controller')
.controller('orderviewController',['$scope','$stateParams','$interval',function(s,$stateParams,$interval){
    console.log($stateParams);
    var orders=[
        {name:"iphone4换屏",orderid:"521023110001",type:'fix',status:'6003',statusName:'待付款',quote:200,ordertime:'1442558466955'},
        {name:"iphone4热卖",orderid:"521023110011",type:'sale',status:'6004',statusName:'待评价',quote:200,ordertime:'1442558466955'},
        {name:"iphone5电源",orderid:"521023110012",type:'fix',status:'6005',statusName:'已完成',quote:200,ordertime:'1442558466955'},
        {name:"iphone4",orderid:"521023110002",type:'fix',status:'6002',statusName:'派单中',quote:200,ordertime:'1442558466955'}
    ];
    s.orders=orders;
}]);
// angular.module('controller')
// .directive('test',function(){
//     return {
//         require:"ngModel",
//         link:function(s,e,a,c){
//             c.$parsers.push(function(val){ 
//                 return val+1;
//             });
//             c.$formatters.push(function(val){                
//                 return 's'+val;
//             });
//         }
//     }
// });