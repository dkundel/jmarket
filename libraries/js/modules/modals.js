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

            email = $("form[name='sign_up'] input[name='email']").val();
            password = $("form[name='sign_up'] input[name='password']").val();
            confirm_password = $("form[name='sign_up'] input[name='password_confirm']").val();
            phone = $("form[name='sign_up'] input[name='phone']").val();
            address = $("form[name='sign_up'] input[name='address']").val();

            match_email = /^\w+\.\w+@jacobs-university.de$/;
            match_phone = /^\d{4}$/;

            if (!email.match(match_email)){
                window.jMarket.Modules.DisplayMessage.print("Invalid email address. Please insert a Jacobs e-mail.","error");
                return;
            }

            if (!address){
                window.jMarket.Modules.DisplayMessage.print("Address field is required.","error");
                return;
            }

            if (!phone.match(match_phone)){
                window.jMarket.Modules.DisplayMessage.print("Invalid phone number. Please insert a Jacobs number.","error");
                return;
            }

            if (!password){
                window.jMarket.Modules.DisplayMessage.print("Password is required.","error");
                return;
            }

            if (password.length < 8){
                window.jMarket.Modules.DisplayMessage.print("Password must contain at least 8 characters.","error");
                return;
            }

            if (password != confirm_password){
                window.jMarket.Modules.DisplayMessage.print("Password doesn't match.","error");
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
                if (data.error){
                    window.jMarket.Modules.DisplayMessage.print(data.error,"error");
                    return;
                }
                Modals.modal.modal('hide');
                var date = new Date();
                date.setTime(date.getTime() + (30 * 60 * 1000));
                $.cookie('user_login', JSON.stringify(data), { expires:date, path:'/' });
                window.jMarket.Modules.LogIn._display_welcome(data.email);
                window.jMarket.Modules.DisplayMessage.print("Welcome to jMarket!",'info');
            });
        }
    },
    createOffer:{
        load:function _load() {
            $('body').modalmanager('loading');

            setTimeout(function () {
                Modals.modal.load('scripts/offer/offer.html', '', function () {
                    Modals.modal.modal();
                });
            }, 1000);
        }

    },
    createReview:{
        load:function _load() {
            $('body').modalmanager('loading');

            setTimeout(function () {
                Modals.modal.load('scripts/review/review.html', '', function () {
                    Modals.modal.modal();
                });
            }, 1000);
        }
    },
    changePassword:{
        load:function _load() {
            $('body').modalmanager('loading');

            setTimeout(function () {
                Modals.modal.load('scripts/change_password/change_password.html', '', function () {
                    Modals.modal.modal();
                });
            }, 1000);
        }
    }
}

window.jMarket.Modules.Modals = Modals;