/**
 * Module for controling user actions
 * @type {Object}
 * @author Dominik Kundel
 */
var User = {
    /**
     *
     * @param data
     * @private
     * @author George Merticariu & Dominik Kundel
     */
    _renderProfilePage:function _render_profile_page(data) {
        var html = "<div class='well'><div class='user-information'><p><i class='icon-envelope'></i> " +
            "<span class='user-email'>" + data.user_info[0][1] + "</span></p><p><i class='icon-home'></i> " +
            data.user_info[0][2] + "</p><p><i class='icon-phone'></i> " +
            data.user_info[0][3] + "</p><p>Rating: <span class='rating_stars'>";
        for (var i = 1; i <= parseInt(data.user_ranking, 10); ++i)
            html += "<i class='icon-star'></i>";
        for (var i = 1; i < 5 - parseInt(data.user_ranking, 10); ++i)
            html += "<i class='icon-star-empty'></i>";

        html += "</span></p></div><div class='user-actions'>";

        var create_review_button = "<a href='javascript:jMarket.Modules.Modals.createReview.load();' class='create-review-btn btn btn-jmarket-orange'><i class='icon-edit icon-white'></i> Review user</a>";
        var change_password_button ="<a href='javascript:jMarket.Modules.Modals.changePassword.load();' class='change-password-btn btn btn-jmarket-orange'><i class='icon-edit icon-white'></i> Change Password</a>";
        if ($.cookie('user_login')){
            var user_data = JSON.parse($.cookie('user_login'));
            if (user_data.email == data.user_info[0][1]){
                create_review_button="";
            }else{
                change_password_button="";
            }
        }else{
            create_review_button="";
            change_password_button="";
        }
        html +=create_review_button+ change_password_button +
            "</div><div class='clearfix'></div></div>";

        $('div.content_wrapper').html(html);
    },

    /**
     *
     * @param id
     * @private
     */
    getProfilePage:function _get_profile_page(id) {
        var data = {
            function:'get_user_information',
            id:id
        };
        $.post(window.jMarket.requestUrl, data, function (data) {
            data = JSON.parse(data);
            if (data.error) {
                window.jMarket.Modules.DisplayMessage.print(data.error, 'error');
                return;
            } else {
                User._renderProfilePage(data);
            }
        });
    },

    /**
     *
     * @private
     */
    getMyProfile:function _get_my_profile() {
        if ($.cookie('user_login')) {
            var login = JSON.parse($.cookie('user_login'));
            var data = {
                function:'get_user_information',
                id:login.user_id
            };
            $.post(window.jMarket.requestUrl, data, function (data) {
                data = JSON.parse(data);
                if (data.error) {
                    window.jMarket.Modules.DisplayMessage.print(data.error, 'error');
                    return;
                } else {
                    User._renderProfilePage(data);
                }
            });
        }
        return;
    }
};

window.jMarket.Modules.User = User;