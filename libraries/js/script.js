/* Author:

*/
window.jMarket = {};
window.jMarket.Modules={
    MainPage : null
};

jQuery(function(){
	var $modal = $('#sign_up_modal');

	$('#sign-up-btn').on('click', function(){
	  // create the backdrop and wait for next modal to be triggered
	  $('body').modalmanager('loading');

	  setTimeout(function(){
	  	$modal.load('scripts/sign_up/sign_up.html', '', function(){
	  		$modal.modal();
	  	});
	  }, 1000);
	});

	$modal.on('click', '.update', function(){
		$modal.modal('loading');
		setTimeout(function(){
			$modal
			.modal('loading')
			.find('.modal-body')
			.prepend('<div class="alert alert-info fade in">' +
				'Updated!<button type="button" class="close" data-dismiss="alert">&times;</button>' +
				'</div>');
		}, 1000);
	});

});




