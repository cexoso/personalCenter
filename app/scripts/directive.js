angular.module('directive', []).
directive('checkbox',function(){
    return{
        restrict:"A",
        require:'ngModel',
        replace:true,
        template:"<span class='checkbox' ng-class='{checked:V}'></span>",
        scope:{
            V:"=ngModel"
        },
        link:function(s,e,a,c){            
        }
    }
});
