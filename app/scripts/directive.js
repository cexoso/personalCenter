angular.module('directive', [])
.directive('checkbox',[function(){
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
}]).directive('pTitle',[function(){
    
    return{
        restrict:"A",
        scope:{
            title:"=pTitle"
        },
        link:function(s,e,a){            
            if(navigator.userAgent.match(/ios|iphone/ig)){
                s.$watch('title',function(d){
                    if(!d){
                        return;
                    }
                    var body=angular.element(document.getElementsByTagName('body')[0]);    
                    var iframe=angular.element(document.createElement('iframe'))
                    iframe.attr("src","/favicon.ico").css({display:"none"});
                    iframe.on("load",function(){
                      setTimeout(function(){
                        iframe.remove();  
                      },0);
                    });
                    body.append(iframe);
                });
            };
        }
    }
}]);
