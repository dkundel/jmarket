var Modals = {
	modal: $('#modal_container'),
	signUp: {
		load: function _load(){
			$('body').modalmanager('loading');
			  setTimeout(function(){
			  	$modal.load('scripts/sign_up/sign_up.html', '', function(){
			  		$modal.modal();
			  	});
			  }, 1000);
		}
	},
	createOffer: {
		load: function _load(){
			$('body').modalmanager('loading');

			  setTimeout(function(){
			  	$modal.load('scripts/offer/offer.html', '', function(){
			  		$modal.modal();
			  	});
			  }, 1000);
		}
	},
	createReview: {
		load: function _load(){
			$('body').modalmanager('loading');

			  setTimeout(function(){
			  	$modal.load('scripts/review/review.html', '', function(){
			  		$modal.modal();
			  	});
			  }, 1000);
		}
	},
	changePassword: {
		load: function _load(){
			$('body').modalmanager('loading');

		  setTimeout(function(){
		  	$modal.load('scripts/change_password/change_password.html', '', function(){
		  		$modal.modal();
		  	});
		  }, 1000);
		}
	}
}

window.jMarket.Modules.Modals = Modals;