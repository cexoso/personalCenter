'use strict';
angular.module('controller')
.controller('orderDetailsController',['$scope',function(s){
    s.process=[
        {id:'1',name:'提交'},
        {id:'2',name:'回复'},
        {id:'3',name:'维修'},
        {id:'4',name:'支付'},
        {id:'5',name:'评价'}
    ]
}]);


angular.module('directive')
.directive('process',[function(){
     return{
        restrict:"A",        
        replace:true,
        template:"<h1>hello</h1>",
        link:function(s,e,a,c){
            console.log(s);
            console.log(e);
            console.log(a);
            console.log(c);
        }
    }
}])