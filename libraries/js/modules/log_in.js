define(['jquery','vendor/order!vendor/libs','vendor/order!modules/modules'], function ($) {
var LogIn = {
    requestData:{
        user:null,
        password:null,
        function:'sign_in'
    },

    log_in:function (form) {
        LogIn.requestData.user = form.find("input#username").val();
        LogIn.requestData.password =form.find("input#password").val();
        LogIn._send_request();
    },

    _send_request:function () {
        $.post(window.jMarket.requestUrl, LogIn.requestData, function (data) {
        data = JSON.parse(data)
        if (data.error){
            window.jMarket.Modules.DisplayMessage.print(data.error,'error');
        }
        });
    }

};

window.jMarket.Modules.LogIn = LogIn;
});