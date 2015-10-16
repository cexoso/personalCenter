angular.module('services')
.service('user',['$filter','searchParse',function(filter,searchParse){
    var obj={};
    function set(k,v){
        obj[k]=v;
        localStorage.setItem(k,filter('json')(v));
    };
    function get(k){
        return obj[k]||searchParse(k)||JSON.parse(localStorage.getItem(k));
    };
    return angular.extend(obj,{
        set:set,
        get:get
    });
}]).filter("orderStatus",function(){
    return function(t){
        var map={
            6001:"已下单",
            6002:"已派单",
            6003:"待付款",
            6004:"待评价",
            6005:"已完成",
            6010:"已取消"            
        };
        return map[t];
    }
}).filter("totlePrice",function(){
    return function(t){
        if(t==-1){
            return "检测后报价";
        }
        return t;
    }
});
angular.module('services')
.service('searchParse',function(){    
    function getQueryStr(name, str) {
        str = str || location.search;
        var res = str.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
        if (res == null || res.length <= 1) {
            return "";
        }
        return res[1];
    }
    return getQueryStr;
})
.service('wx',['$q','$http','baseUrl','fjson','user',function($q,$http,baseUrl,fjson,user){
    function config(params){
        var deferred = $q.defer();
        $http.get(baseUrl+"mvc/wxcontrol/getwxconfig").success(function(d){
            var o={
                appId: d.appID,
                timestamp: d.jsapi_timestamp,
                nonceStr: d.jsapi_noncestr,
                signature: d.jsapi_signature,
                jsApiList: [
                    "onMenuShareTimeline",
                    "onMenuShareAppMessage",
                    "onMenuShareQQ",
                    "onMenuShareWeibo",
                    "onMenuShareQZone",
                    "startRecord",
                    "stopRecord",
                    "onVoiceRecordEnd",
                    "playVoice",
                    "pauseVoice",
                    "stopVoice",
                    "onVoicePlayEnd",
                    "uploadVoice",
                    "downloadVoice",
                    "chooseImage",
                    "previewImage",
                    "uploadImage",
                    "downloadImage",
                    "translateVoice",
                    "getNetworkType",
                    "openLocation",
                    "getLocation",
                    "hideOptionMenu",
                    "showOptionMenu",
                    "hideMenuItems",
                    "showMenuItems",
                    "hideAllNonBaseMenuItem",
                    "showAllNonBaseMenuItem",
                    "closeWindow",
                    "scanQRCode",
                    "chooseWXPay",
                    "openProductSpecificView",
                    "addCard",
                    "chooseCard",
                    "openCard"]
            };                    
            var obj=angular.extend(o,params);         
            wx.config(obj);
        }).error(function(d){
            console.error(d);
        });
        wx.ready(function(){
            deferred.resolve();
        });
        wx.error(function(d){
            deferred.reject(d); 
        });
        return deferred.promise;
    }
    function pay(o){
        return $http.get(baseUrl+"mvc/wxcontrol/wxpay",{
            params:{
                requestParam:$filter('json')(angular.extend({"wxOpenID":user.get('wxOpenid')},o))
            }
        }).success(function(d){
            if(d.code!=200){
                alert(d.msg);
                return;
            }
            var d=d.data;
            var o={
                "timestamp": d.timestamp,
                "nonceStr": d.nonce_str,
                "package": "prepay_id="+d.prepay_id,
                "signType":'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                "paySign": d.sign, // 支付签名
                success: function (res) {
                    alert(fjson(res));
                }
            };
            alert(fjson(o));
            wx.chooseWXPay(o);
        });
    }
    function payNewVer(o){
        function onBridgeReady(){
            alert(o)
            $http.get(baseUrl+"mvc/wxcontrol/wxpay",{
                params:{
                    requestParam:fjson(angular.extend({"wxOpenID":user.get('wxOpenid')},o))
                }
            }).success(function(d){
                d=d.data;
                alert(d);
                WeixinJSBridge.invoke(
                   'getBrandWCPayRequest', {
                       "appId" : d.appid,
                       "timeStamp":d.timeStamp,
                       "nonceStr" : d.nonce_str,
                       "package" : "prepay_id="+d.prepay_id,
                       "signType" : "MD5",         //微信签名方式:     
                       "paySign" : d.sign
                   },
                   function(res){     
                       if(res.err_msg == "get_brand_wcpay_request：ok" ) {}     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
                   }
                ); 
            });
        }
        if (typeof WeixinJSBridge == "undefined"){
           if( document.addEventListener ){
               document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
           }else if (document.attachEvent){
               document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
               document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
           }
        }else{
           onBridgeReady();
        }
    }
    return {
        pay:pay,
        config:config,
        payNewVer:payNewVer
    }
}])
.service("fjson",["$filter",function($filter){
    return $filter("json");
}])
.service("loading",[function(){
    var d=angular.element(document.createElement("div"));
    d.attr("id","loading");
    angular.element(document.querySelector('body')).append(d);
    var dr=angular.element(document.createElement("div"));
    d.append(dr);
    dr.addClass("rotate");
    dr.append(angular.element(document.createElement("div")));
    console.log(d);
    function show(){
       d.addClass("active");
    }
    function hide(){
        d.removeClass("active");     
    }
    return {
        show:show,
        hide:hide
    }
}])
// .constant("baseUrl","/Patica2.0/");//正式
.constant("baseUrl","");

