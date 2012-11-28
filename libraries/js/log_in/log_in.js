var LogIn = {
    requestData:{
        user:null,
        password:null,
        function:'sign_in'
    },

    log_in:function (form) {
        LogIn.requestData.user = form.find("input#username").val();
        LogIn.requestData.password = form.find("input#password").val();
        LogIn._send_request();
    },

    _send_request:function () {
        $.post(window.jMarket.requestUrl, LogIn.requestData, function (data) {
            data = JSON.parse(data)
            if (data.error) {
                window.jMarket.Modules.DisplayMessage.print(data.error, 'error');
                return;
            }
            var date = new Date();
            date.setTime(date.getTime() + (30 * 60 * 1000));
            $.cookie('user_id', data.user_id, { expires:date, path:'/' });
            if ($.cookie('user_id')) {
                window.jMarket.Modules.DisplayMessage.print("Login successful", "success");
                window.jMarket.Modules.LogIn._logout_button();
            } else {
                window.jMarket.Modules.DisplayMessage.print("Login failed. Please try again later.", 'error');
            }


        });
    },

    _logout_button:function () {
        $('li.login').hide();
        $('li.logout').show();
    }

};

window.jMarket.Modules.LogIn = LogIn;