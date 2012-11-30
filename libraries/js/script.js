/* Author:

 */
jQuery(function () {
    window.jMarket.Modules.MainPage.load();

    /*
        EVENT LISTENER
     */
    $('form#login_form').submit(function (e) {
        e.preventDefault();
        window.jMarket.Modules.LogIn.log_in($(this));
    });
    $('#sign_up_modal').on('click', window.jMarket.Modules.Modals.signUp.load);
    $('#imprint').on('click',window.jMarket.Modules.Imprint._load);
    $('#user_log_out').on('click', window.jMarket.Modules.LogOut.logout);
    $("#search_form").ajaxForm();
    $("#search_form").submit(window.jMarket.Modules.Search.submit);
    $('a#logout_button').on('click',window.jMarket.Modules.LogOut.logout);
    $('a#sell_product_button').on('click', window.jMarket.Modules.Modals.createOffer.load);
    $('a#my_account_button').on('click', window.jMarket.Modules.getMyProfile);

    $("#slider-range").slider({
        range:true,
        min:0,
        max:1000,
        values:[ 0, 1000 ],
        slide:function (event, ui) {
            $("#min_amount").val(ui.values[ 0 ]);
            $("#max_amount").val(ui.values[ 1 ]);
        }
    });
    var $modal = $('#sign_up_modal');

    $modal.on('click', '.update', function () {
        $modal.modal('loading');
        setTimeout(function () {
            $modal
                .modal('loading')
                .find('.modal-body')
                .prepend('<div class="alert alert-info fade in">' +
                'Updated!<button type="button" class="close" data-dismiss="alert">&times;</button>' +
                '</div>');
        }, 1000);
    });

    var login_check = $.cookie('user_login');
    if (login_check){
        login_check = JSON.parse(login_check);
        window.jMarket.Modules.LogIn._display_welcome(login_check.email);
    }

    
});


