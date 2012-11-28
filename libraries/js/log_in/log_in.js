var LogIn = {
    requestData:{
        userName:null,
        passwd:null,
        function:'sign_in'
    },

    log_in:function () {
        LogIn.requestData.userName = $("input#username").val();
        LogIn.requestData.passwd = $("input#password").val();
        LogIn._send_request();
    },

    _send_request:function () {
        $.post(window.jMarket.requestUrl, LogIn.requestData, function (data) {
            data = JSON.parse();
            console.log(data);
        });
    }

};

window.jMarket.Modules.LogIn = LogIn;