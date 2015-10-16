'use strict';
angular.module('controller')
.controller('evaluateController',['$scope','$stateParams','task','data','$http','baseUrl',function(s,$stateParams,task,data,$http,baseUrl){
    s.data=data;
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
        })).then(function(d){
            s.data=d.data;
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
angular.module('directive')
.directive('evaluateStar',[function(){
     return{
        restrict:"A",        
        replace:true,
        require:"?ngModel",        
        templateUrl:"components/evaluate/tpl/evaluateStar.html",
        link:function(s,ele,a,c){
            var star_count=a.evaluateStar;
            var root=angular.element(ele);
            var starArr=[];
            for(var i=0;i<star_count;i++){
                var e=angular.element(document.createElement('span'));
                e.addClass('star');
                e.attr('star_index',i+1);
                root.append(e);
                starArr.push(e);
                e.on('click',star_click_handle);
            }
            function star_click_handle(e){                
                if(a.disabled){
                    return;
                };
                var current_index=angular.element(e.target).attr('star_index');
                c&&c.$setViewValue(+current_index);
                render(current_index);
            }
            function render(current_index){
                angular.element(document.querySelectorAll(".star","[evaluateStar]")).removeClass("active");
                for(var i=0,length=starArr.length;i<length;i++){
                    var _this=angular.element(starArr[i]);
                    if(+_this.attr('star_index')<=+current_index){
                        _this.addClass("active");                        
                    }else{
                        break;
                    }
                }
            }
            if(c){
                s.$watch(a.ngModel,function(n){
                    render(n)
                });
            }
        }
    }
}]).directive('taglist',[function(){
     return{
        restrict:"A",                
        require:"?ngModel",
        controller:['$scope','$element','$attrs',function($scope,$element,$attrs){
        }],     
        link:function(s,ele,a,c){
            if(c){
                s.$watch(a.ngModel,function(n){
                    if(!n){
                        return;
                    }
                    var arr=n.split('-');
                    angular.forEach(s.taglist,function(v,k){
                        if(arr.indexOf(v.name)!=-1){
                            v.active=true;
                        }
                    });
                },true);
            }
            s.$watch("taglist",watchFun,true);
            function watchFun(n){
                if(!n){
                    return;
                }
                var arr=[];
                angular.forEach(n,function(v,k){
                    if(v.active){
                        arr.push(v.name);
                    }
                });
                c.$setViewValue(arr.join("-"));
            }
        }
    }
}]).directive('tag',[function(){
     return{
        restrict:"A",                
        require:"^taglist",
        transclude:true,
        templateUrl:"components/evaluate/tpl/tag.html",
        link:function(s,ele,a,c){
            angular.element(ele).off("click").on("click",function(e){
                var isdisabled=angular.element(ele).parent().attr("disabled");
                if(isdisabled){
                    return;
                }
                s.$apply(function(){
                    s.tag.active=(s.tag.active?false:true);    
                })
            });            
        }
    }
}]);