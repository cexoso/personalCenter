'use strict';
angular.module('controller')
.controller('addAddrController',['$scope','user','$state','Restangular','baseUrl',function(s,user,$state,rest,baseUrl){
    s.addrconf={};
    s.data={};
    var res=rest.all("api").one("config",'getAddress');
    res.get({parentCode:'root'}).then(function(d){
        s.addrconf.provinces=d.data;
    });
    watch();
    function watch(){
        s.$watch('data.province',function(n){
            if(!n){
                return;
            }
            res.get({parentCode:n}).then(function(d){
                s.addrconf.citys=d.data;
                s.data.city=s.addrconf.citys[0].code;
            });
        });
        s.$watch('data.city',function(n){
            if(!n){
                return;
            }
            res.get({parentCode:n}).then(function(d){
                s.addrconf.areas=d.data;
                s.data.area=s.addrconf.areas[0].code;
            });
        });
    }
    s.post=function(){
        return rest.all(baseUrl+"api").one("center",'address').doPOST(angular.extend({wxOpenid:user.get('wxOpenid')},s.data)).then(function(d){
            $state.go('myaddr');
        });
    }
}]);