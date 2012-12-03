/**
 * Module for loading modal windows
 * @type {Object}
 * @author Dominik Kundel
 */

var Modals = {
    /**
     * modal container
     */
    modal:$('#modal_container'),

    /**
     * sign up module
     * open modal window, validate user input, tries to create account, print success/error message
     */
    signUp:{
        /**
         * Open the modal window
         * @private
         */
        load:function _load() {
            $('body').modalmanager('loading');
            setTimeout(function () {
                Modals.modal.load('scripts/sign_up/sign_up.html', '', function () {
                    Modals.modal.modal();
                });
            }, 500);
        },
        /**
         * validate user input
         * tries to create account
         * print error/success message
         * on success logs user in
         * @private
         */
        submit:function _load() {

            var email = $("form[name='sign_up'] input[name='email']").val();
            var password = $("form[name='sign_up'] input[name='password']").val();
            var confirm_password = $("form[name='sign_up'] input[name='password_confirm']").val();
            var phone = $("form[name='sign_up'] input[name='phone']").val();
            var address = $("form[name='sign_up'] input[name='address']").val();

            var match_email = /^\w+\.\w+@jacobs-university.de$/;
            var match_phone = /^\d{4}$/;

            if (!email.match(match_email)) {
                window.jMarket.Modules.DisplayMessage.print("Invalid email address. Please insert a Jacobs e-mail.", "error");
                return;
            }

            if (!address) {
                window.jMarket.Modules.DisplayMessage.print("Address field is required.", "error");
                return;
            }

            if (!phone.match(match_phone)) {
                window.jMarket.Modules.DisplayMessage.print("Invalid phone number. Please insert a Jacobs number.", "error");
                return;
            }

            if (!password) {
                window.jMarket.Modules.DisplayMessage.print("Password is required.", "error");
                return;
            }

            if (password.length < 8) {
                window.jMarket.Modules.DisplayMessage.print("Password must contain at least 8 characters.", "error");
                return;
            }

            if (password != confirm_password) {
                window.jMarket.Modules.DisplayMessage.print("Password doesn't match.", "error");
                return;
            }

            var data = {
                function:"sign_up",
                email:email,
                password:password,
                phone:phone,
                address:address
            };
            $.post(window.jMarket.requestUrl, data, function (data) {
                data = JSON.parse(data);
                if (data.error) {
                    window.jMarket.Modules.DisplayMessage.print(data.error, "error");
                    return;
                }
                Modals.modal.modal('hide');
                var date = new Date();
                date.setTime(date.getTime() + (30 * 60 * 500));
                $.cookie('user_login', JSON.stringify(data), { expires:date, path:'/' });
                window.jMarket.Modules.LogIn._display_welcome(data.email);
                window.jMarket.Modules.DisplayMessage.print("Welcome to jMarket!", 'info');
            });
        }
    },
    /**
     * Module for creating an offer
     */
    createOffer:{
        /**
         * if user is not login exits
         * open modal window
         * add the category list
         * sends the form as an ajaxForm
         * print success/error message
         * on success redirects to product page
         * @private
         */
        load:function _load() {
            if (!$.cookie('user_login')) {
                return;
            }

            $('body').modalmanager('loading');

            setTimeout(function () {
                Modals.modal.load('scripts/offer/offer.html', '', function () {
                    Modals.modal.modal();
                    setTimeout(function(){
                        $('button#create_product').click(function () {
                            var form = $('form#create_offer_form');
                            form.ajaxForm(function (data) {
                                data = JSON.parse(data);
                                if (data.error) {
                                    window.jMarket.Modules.DisplayMessage.print(data.error, 'error');
                                } else {
                                    Modals.modal.modal('hide');
                                    window.jMarket.Modules.Product.getInfo(data.product_id);
                                }
                            }).submit();
                        });
                    },500);
                });

                var data = {
                    function:'get_categories'
                }

                $.post(window.jMarket.requestUrl, data, function (data) {

                    data = JSON.parse(data);
                    if (data.error) {
                        window.jMarket.Modules.DisplayMessage.print(data.error, 'error');
                        return;
                    }
                    var select = Modals.modal.find('select#category');
                    var options = "";
                    for (var id in data.categories) {
                        var category = data.categories[id];
                        options += '<option name="' + category[0] + '">' + category[1] + '</option>';
                    }
                    select.html(options);

                    var user_id = JSON.parse($.cookie('user_login')).user_id;
                    $('input[name="user_id"]').val(user_id);
                });

            }, 500);
        }
    },

    /**
     * Create review module
     * creates a review for an user
     */
    createReview:{
        /**
         * Loads the create review window
         * bind the submit function to crete review button
         * @private
         */
        load:function _load() {
            $('body').modalmanager('loading');

            setTimeout(function () {
                Modals.modal.load('scripts/review/review.html', '', function () {
                    Modals.modal.modal();
                    $('button#create_review').on('click',window.jMarket.Modules.Modals.createReview.submit);
                });
            }, 500);
        },
        /**
         *  Create user review via ajax
         *  print success/error message
          * @private
         */
        submit: function _submit() {
            var user_login = JSON.parse($.cookie('user_login'));
            if(user_login){
                var user_id = user_login.user_id;
                $review = $('form[name="review_form"]');

                if(rating <= 0 || rating > 5){
                    window.jMarket.Modules.DisplayMessage.print("Invalid rating score!", "error");
                    return;
                }
                var data = {
                    function: 'create_review',
                    from: user_id,
                    to: to_email,
                    review: review,
                    rating: rating
                }

                $.post(window.jMarket.requestUrl, data, function(data){
                    data = JSON.parse(data);

                    if(data.error){
                        window.jMarket.Modules.DisplayMessage.print(data.error, "error");
                        return;
                    } else {
                        window.jMarket.Modules.DisplayMessage.print("Review successfully created!", "success");
                        Modals.modal.modal('hide');
                        return;
                    }
                });
            } else {
                window.jMarket.Modules.DisplayMessage.print("User not logged in!", "error");
                return;
            }
        }
    },

    /**
     * Module for changing the password
     */
    changePassword:{
        /**
         * open the change password modal
         * @private
         */
        load:function _load() {
            $('body').modalmanager('loading');

            setTimeout(function () {
                Modals.modal.load('scripts/change_password/change_password.html', '', function () {
                    Modals.modal.modal();
                });
            }, 500);
        },

        /**
         * take the data from the form
         * change the password via ajax
         * print error/success message
         * @private
         */
        submit: function _submit() {
            var old_pw = $form.find('input[name="old_password"]').val();
            var pw = $form.find('input[name="password"]').val();
            var pw_confirm = $form.find('input[name="password_confirm"]').val();

            if(pw.length < 8){
                window.jMarket.Modules.DisplayMessage.print("Password must contain at least 8 characters.","error");
                return;
            }
            if(pw != pw_confirm){
                window.jMarket.Modules.DisplayMessage.print("Password doesn't match.","error");
                return;
            }
            var data = {
                function: 'change_password',
                password: pw,
                old_password: old_pw,
                id:JSON.parse($.cookie('user_login')).user_id
            };
            console.log(data);
            $.post(window.jMarket.requestUrl, data, function(data){
                data = JSON.parse(data);
                if(data.error){
                    window.jMarket.Modules.DisplayMessage.print(data.error, "error");
                    return;
                } else {
                    window.jMarket.Modules.DisplayMessage.print("Password has been changed!", "success");
                    Modals.modal.modal('hide');
                }
            });
        }
    }
}

window.jMarket.Modules.Modals = Modals;