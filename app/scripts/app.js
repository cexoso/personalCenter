'use strict';
angular.module('paticaApp', [  
  'ui.router',
  'restangular',
  'ngDialog',
  'controller',
  'directive',
  'services',
  'templates'
]).config(['$stateProvider',
'$urlRouterProvider',
function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/index');
    $stateProvider.state('index',{
        url: '/index',
        templateUrl: 'components/index/index.html',    
        controller:'indexController',
        title:'个人中心'
    }).state('order',{
        url:'/order',        
        views:{
            '':{
                templateUrl: 'components/order/order.html',    
                controller:'orderController'                
            }
        },
        title:'我的订单'
    }).state('coupons',{        
        url:'/coupons',
        title:'优惠券',
        views:{
            '':{
                templateUrl: 'components/coupons/coupons.html',    
                controller:'couponsController'                
            }
        }
    }).state('myaddr',{
        url: '/myaddr',
        templateUrl: 'components/myaddr/myaddr.html',    
        controller:'myaddrController',
        title:'我的地址'
    }).state('cusvice',{
        url: '/cusvice',
        templateUrl: 'components/cusvice/cusvice.html',    
        controller:'cusviceController',
        title:'客服热线'
    }).state('orderDetails',{
        url: '/orderDetails/:orderID',
        templateUrl: 'components/orderDetails/orderDetails.html',    
        controller:'orderDetailsController',
        title:'订单详情',
        resolve:{
            order:['$stateParams','$http','baseUrl',function($stateParams,$http,baseUrl){
                return $http.get(baseUrl+'api/repair/getRepairCusOrder',{
                    cache:false,
                    params:$stateParams
                });
            }]
        }
    }).state('evaluate',{
        url: '/evaluate/:orderID',
        templateUrl: 'components/evaluate/evaluate.html',    
        controller:'evaluateController',
        title:'评价',
        resolve:{
            data:['$stateParams','Restangular','baseUrl','$q',function($stateParams,rest,baseUrl,$q){
                console.log($stateParams);
                var deferred = $q.defer();
                var task=rest.all(baseUrl+"api").one("task","repairtask");
                var data=task.get($stateParams);
                data.then(function(d){
                    var data=d.data[0];
                    if(!data){
                        deferred.reject('不存在的id');
                        alert('不存在的id');
                        history.back();
                    }else{
                        deferred.resolve(data);
                    }
                },function(d){
                    deferred.reject(d);
                    alert("出错了");
                    console.error(d);
                    history.back();
                });
                return deferred.promise;
            }],
            task:['Restangular','baseUrl',function(rest,baseUrl){
                var task=rest.all(baseUrl+"api").one("task","repairtask");
                return task;
            }]
        }
    }).state('addAddr',{
        url: '/addAddr',
        templateUrl: 'components/addAddr/addAddr.html',    
        controller:'addAddrController',
        title:'新增地址'
    }).state('editAddr',{
        url: '/editAddr/:id',
        templateUrl: 'components/editAddr/editAddr.html',    
        controller:'editAddrController',
        title:'修改地址',
        resolve:{
            address:['$stateParams','$http','baseUrl',function($stateParams,$http,baseUrl){
                return $http.get(baseUrl+'api/center/address',{params:$stateParams});
            }]
        }
    }).state('payment',{
        url: '/payment/:orderID',
        templateUrl: 'components/payment/payment.html',    
        controller:'paymentController',
        title:'支付',
        resolve:{
            order:['$stateParams','$http','baseUrl','$q','$filter',function($stateParams,$http,baseUrl,$q,$filter){
                var deferred = $q.defer();
                $http.get(baseUrl+'api/repair/getRepairCusOrder',{
                    cache:false,
                    params:$stateParams
                }).success(function(d){
                    if(d.code!=200||!d.data.orderHead){
                        deferred.reject(d);
                        alert($filter('json')(d));
                        history.back();
                    }else{
                        var data=d.data;
                        deferred.resolve(data);
                    }
                }).error(function(d){
                    deferred.reject(d);
                    alert($filter('json')(d));
                    history.back();
                });
                return deferred.promise;
            }]
        }
    });
}]).run(['$rootScope','$interval','$location','user','searchParse','$http','baseUrl',function($rootScope,$interval,$location,user,searchParse,$http,baseUrl){    
    searchParse('usercode')&&user.set('wxOpenid',searchParse('usercode'));
    $http.get(baseUrl+"mvc/wxcontrol/getcustomerdata").success(function(d){
        var data=d.data||{};
        user.set("wxHeadImage",data.wxHeadImage||"");
        user.set("wxNickName",data.wxNickName||"游客");
    });
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
        if(toState.title){
            $rootScope.title=toState.title; 
        }
    });
}])

angular.module('controller', []);
angular.module('directive', []);
angular.module('services', []);
angular.module('templates', []);
