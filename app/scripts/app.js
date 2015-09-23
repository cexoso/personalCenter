'use strict';
angular.module('paticaApp', [  
  'ui.router',
  'ngDialog',
  'controller',
  'directive',
  'templates'
]).config(['$stateProvider',
'$urlRouterProvider',
function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/evaluate');
    $stateProvider.state('index',{
        url: '/index',
        templateUrl: 'components/index/index.html',    
        controller:'indexController',
        title:'个人中心'
    }).state('order',{        
        abstract:true,
        views:{
            '':{
                templateUrl: 'components/order/order.html',    
                controller:'orderController'                
            }
        }
    }).state('order.orderview',{
        url:'/order/:type',
        title:'我的订单',
        views:{
            'orderview':{
                templateUrl: 'components/order/tpl/orderview.html',    
                controller:'orderviewController'                
            }
        }
    }).state('coupons',{        
        abstract:true,
        views:{
            '':{
                templateUrl: 'components/coupons/coupons.html',    
                controller:'couponsController'                
            }
        }
    }).state('coupons.couponsview',{
        url:'/coupons/:type',
        title:'优惠券',
        views:{
            'couponsview':{
                templateUrl: 'components/coupons/tpl/couponsview.html',    
                controller:'couponsviewController'                
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
        url: '/orderDetails/:id',
        templateUrl: 'components/orderDetails/orderDetails.html',    
        controller:'orderDetailsController',
        title:'订单详情',
        resolve:{
            order:['$stateParams','$http',function($stateParams,$http){
                return {
                }
            }]
        }
    }).state('evaluate',{
        url: '/evaluate',
        templateUrl: 'components/evaluate/evaluate.html',    
        controller:'evaluateController',
        title:'评价'
    });

    
}]).run(['$rootScope','$interval',function($rootScope,$interval){    
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
        if(toState.title){
            $rootScope.title=toState.title; 
        }
    });
}]);

angular.module('controller', []);
angular.module('directive', []);
angular.module('templates', []);