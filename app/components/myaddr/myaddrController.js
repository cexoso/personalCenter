'use strict';
angular.module('controller')
.controller('myaddrController',['$scope','$state','ngDialog','$filter','Restangular','$http','baseUrl','user',function(s,$state,ngDialog,$filter,rest,$http,baseUrl,user){
    var addr=rest.all(baseUrl+'api').one("center",'address');
    s.addrs=addr.get({wxOpenid:user.get("wxOpenid")}).$object;
    s.setDefault=function(addr){
        if(~~addr.isDefault===1){
            return;
        }
        $http.post(baseUrl+"api/center/setDefaultAddress",{id:addr.id+""})
        .success(function(d){
            if(d.code!=200){
                alert(d.msg);
            }else{
                $state.reload();
            }
        }).error(function(d){
            console.log(d);
            alert(d);
        });
    }
    s.delete=function(e,address){        
        e.stopPropagation();
        var dialog={};   
        angular.extend(dialog,ngDialog.open({
            template:'components/myaddr/tpl/confirm.html',                
            controller:'confirmController',
            disableAnimation:true,
            showClose:false,
            resolve:{
                dialog:[function(){                    
                    return dialog;
                }]
            }
        }));

        dialog.closePromise.then(function(d){
            if(d.value=="ok"){
                addr.remove({id:address.id}).then(function(d){
                    if(d.code!=200){
                        alert(d.msg);
                    }else{
                        alert("删除成功");
                        $state.reload();
                    }
                },function(d){
                    alert($filter('json')(d));
                });
            }else if(d.value=="cancel"){
            }
        });
    }
    s.edit=function(e,addr){        
        e.stopPropagation();
        $state.go("editAddr",{id:addr.id});
    }
}]);