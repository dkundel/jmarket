var LogOut = {
    logout:function () {
        $.removeCookie('user_login', { path:'/' });
        window.jMarket.Modules.DisplayMessage.print("Logout successful.", "success");
        setTimeout(function () {
            window.location = ".";
        }, 1000);
    }

};

window.jMarket.Modules.LogOut = LogOut;