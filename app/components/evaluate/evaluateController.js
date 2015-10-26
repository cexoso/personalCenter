'use strict';
angular.module('controller')
.controller('evaluateController',['$scope','$stateParams','task','data','$http','baseUrl',function(s,$stateParams,task,data,$http,baseUrl){
    s.data=data;
    console.log(s.data);
    s.taglist=[
        {name:'高颜值'},
        {name:'搞机大师'},
        {name:'好准时'},
        {name:'效率极高'},
        {name:'态度好'},
        {name:'我要给最高'}
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
