var Modals = {
    modal:$('#modal_container'),
    signUp:{
        load:function _load() {
            $('body').modalmanager('loading');
            setTimeout(function () {
                Modals.modal.load('scripts/sign_up/sign_up.html', '', function () {
                    Modals.modal.modal();
                });
            }, 500);
        },
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
    createOffer:{
        load:function _load() {
            if (!$.cookie('user_login')) {
                return;
            }

            $('body').modalmanager('loading');

            setTimeout(function () {
                Modals.modal.load('scripts/offer/offer.html', '', function () {
                    Modals.modal.modal();
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
                $('button#create_product').live('click', function () {
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
            }, 500);
        }
    },
    createReview:{
        load:function _load(email) {
            $('body').modalmanager('loading');

            setTimeout(function () {
                Modals.modal.load('scripts/review/review.html', '', function () {
                    $('form[name="review_form"]').find('input[name="name"]').val(email);
                    Modals.modal.modal();
                });
            }, 500);
        },
        submit: function _submit() {
            var user_login = JSON.parse($.cookie('user_login'));
            if(user_login){
                var user_id = user_login.user_id;
                $review = $('form[name="review_form"]');
                var to_email = $review.find('input[name="name"]').val();
                var review = $review.find('input[name="review"]').val();
                var rating = parseInt($review.find('input[name="rating"]').val(), 10);
                var match_email = /^\w+\.\w+@jacobs-university.de$/; 
                if(!to_email.match(match_email)){
                    window.jMarket.Modules.DisplayMessage.print("E-Mail is not a Jacobs E-Mail", "error");
                    return;
                }
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
                        Modal.modal.modal('hide');
                        return;
                    }
                });
            } else {
                window.jMarket.Modules.DisplayMessage.print("User not logged in!", "error");
                return;
            }
        }
    },
    changePassword:{
        load:function _load() {
            $('body').modalmanager('loading');

            setTimeout(function () {
                Modals.modal.load('scripts/change_password/change_password.html', '', function () {
                    Modals.modal.modal();
                });
            }, 500);
        },
        submit: function _submit() {
            var $form = $('form[name="change_password_form"]');
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
                old_password: old_pw
            };
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