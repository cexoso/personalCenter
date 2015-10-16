'use strict';
angular.module('controller')
.controller('editAddrController',['$scope','address','$state','Restangular','baseUrl',function(s,address,$state,rest,baseUrl){
    var res=rest.all(baseUrl+"api").one("config",'getAddress');
    res.get({parentCode:'root'});
    s.addrconf={};
    s.data={};
    res.get({parentCode:'root'}).then(function(d){
        s.addrconf.provinces=d.data;
    });
    s.data=address.data.data[0];
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
        return rest.all(baseUrl+"api").one("center",'address').doPUT(s.data).then(function(d){
            $state.go('myaddr');
        });
    }
}]);