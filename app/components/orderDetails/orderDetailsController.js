'use strict';
angular.module('controller')
.controller('orderDetailsController',['$scope','order','Restangular','baseUrl',function(s,order,rest,baseUrl){
    s.order=order.data.data;
    s.process=[
        {status:'6001',name:'已下单'},
        {status:'6002',name:'已派单'},
        {status:'6003',name:'待付款'},
        {status:'6004',name:'待评价'},
        {status:'6005',name:'已完成'}
    ];
    s.cancel=function(){
        var b=confirm("您确定取消订单？");
        if(b){
            console.log("del");
            rest.all(baseUrl+"api").one("repair","order").remove({orderID:s.order.orderHead.orderID});
        }else{

        }
    }
}]);