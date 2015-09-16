'use strict';
angular.module('paticaApp', [  
  'ui.router',
  'controller'
]).config(['$stateProvider',
'$urlRouterProvider',
function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/order');
    $stateProvider.state('index',{
        url: '/index',
        templateUrl: 'components/index/index.html',    
        controller:'indexController',
        title:'个人中心'
    }).state('order',{
        url: '/order',
        templateUrl: 'components/order/order.html',    
        controller:'orderController',
        title:'我的订单'
    });
}]).run(['$rootScope','$interval',function($rootScope,$interval){    
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
        $rootScope.title=toState.title||"patica";        
    });
}]);

angular.module('controller', []);