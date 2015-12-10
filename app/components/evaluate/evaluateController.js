'use strict';
angular.module('controller')
.controller('evaluateController',['$scope','$stateParams','task','data','$http','baseUrl',function(s,$stateParams,task,data,$http,baseUrl){
    s.data=data;
    console.log(s.data);
    s.taglist=[
        {name:'颜值高'},
        {name:'搞机大师'},
        {name:'好准时'},
        {name:'快捷放心'},
        {name:'效率高'},
        {name:'上门及时'},
        {name:'诚信可靠'},
        {name:'专业'}
    ];
    s.submit=function(){
        $http.post(baseUrl+"api/task/postEvaluate",angular.extend($stateParams,s.data,{
            status:6005//已完成
        })).success(function(d){
            s.data=d.data;
            console.log(s.data);
        });
        // task.doPUT(angular.extend($stateParams,s.data,{
        //     status:6005//已完成
        // })).then(function(d){
        //     s.data=d.data;
        // });
    };
    s.back=function(){
        history.back();
    };
}]);
