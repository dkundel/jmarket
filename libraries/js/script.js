/* Author:

*/
window.jMarket = {};
window.jMarket.Modules={
    MainPage : null
};



jQuery(function(){
	var $modal = $('#sign_up_modal');

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




