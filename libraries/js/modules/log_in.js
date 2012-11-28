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
            $.cookie('user_login', JSON.stringify(data), { expires:date, path:'/' });

            if ($.cookie('user_login')) {
                window.jMarket.Modules.DisplayMessage.print("Log in successful.","success");
                LogIn._display_welcome(data.email);
            }else{
                window.jMarket.Modules.DisplayMessage.print("Login failed. Please try again later.","error");
            }

        });
    },

    _display_welcome:function (name) {
        $('li.login').hide();
        var logout = $('li.logout');
        name = name.split("@jacobs-university.de");
        logout.find('span#user_name').html(name[0]);
        logout.show();
    }
};

window.jMarket.Modules.LogIn = LogIn;
