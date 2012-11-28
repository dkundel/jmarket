define(['jquery','vendor/order!vendor/libs','vendor/order!modules/modules'], function ($) {

var Modals = {
	modal: $('#modal_container'),
	signUp: {
		load: function _load(){
			$('body').modalmanager('loading');
			  setTimeout(function(){
			  	Modals.modal.load('scripts/sign_up/sign_up.html', '', function(){
			  		Modals.modal.modal();
			  	});
			  }, 1000);
		},
		submit: function _load(){
			var data = {
				function: "sign_up"
			};
			data.email = $("form[name='sign_up'] input[name='email']").val();
			if(data.email.length() == 0){
				$("form[name='sign_up'] label[for='password'].control-label").parent().addClass("error");
				return;
			}
			data.password = $("form[name='sign_up'] input[name='password']").val();
			if(data.password != $("form[name='sign_up'] input[name='password-confirm']").val() || data.password.length() == 0) {
				$("form[name='sign_up'] label[for='password'].control-label").parent().addClass("error");
				$("form[name='sign_up'] label[for='password_confirm'].control-label").parent().addClass("error");
				return;
			} 
			data.phone = $("form[name='sign_up'] input[name='phone']").val();
			if(data.phone.length() == 0){
				$("form[name='sign_up'] label[for='phone'].control-label").parent().addClass("error");
				return;
			}
			data.address = $("form[name='sign_up'] input[name='address']").val();
			if(data.phone.length() == 0){
				$("form[name='sign_up'] label[for='address'].control-label").parent().addClass("error");
				return;
			}
			$.post(window.jMarket.requestURL, data, function(data){
				data = JSON.parse(data);
				Modals.modal.modal('hide');
				var date = new Date();
 				date.setTime(date.getTime() + (30 * 60 * 1000));
				$.cookie('user_id', data, { expires: date, path: '/' });
			});
		}
	},
	createOffer: {
		load: function _load(){
			$('body').modalmanager('loading');

			  setTimeout(function(){
			  	Modals.modal.load('scripts/offer/offer.html', '', function(){
			  		Modals.modal.modal();
			  	});
			  }, 1000);
		}
		
	},
	createReview: {
		load: function _load(){
			$('body').modalmanager('loading');

			  setTimeout(function(){
			  	Modals.modal.load('scripts/review/review.html', '', function(){
			  		Modals.modal.modal();
			  	});
			  }, 1000);
		}
	},
	changePassword: {
		load: function _load(){
			$('body').modalmanager('loading');

		  setTimeout(function(){
		  	Modals.modal.load('scripts/change_password/change_password.html', '', function(){
		  		Modals.modal.modal();
		  	});
		  }, 1000);
		}
	}
}

window.jMarket.Modules.Modals = Modals;
});