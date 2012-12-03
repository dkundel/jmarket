/**
 * Module for logging out a user
 * @type {Object}
 * @author George Merticariu
 */

var LogOut = {
    /**
     * Logs out the user
     * Redirect to the index page
     */
    logout:function () {
        $.removeCookie('user_login', { path:'/' });
        window.jMarket.Modules.DisplayMessage.print("Logout successful.", "success");
        setTimeout(function () {
            window.location = ".";
        }, 1000);
    }

};

window.jMarket.Modules.LogOut = LogOut;