require([
		"jquery", 
		"jquery-ui.min", 
		"jquery.cookie",
		"bootstrap.min",
		"bootstrap-modal",
		"bootstrap-modalmanager",
		"bootstrap-datepicker",
		"order!script",
		"order!main_page/main_page",
		"order!modals/modals"
	],
	function($) {
	    $(function() {
	         window.jMarket.Modules.MainPage.load();
                    $('form#login_form').submit(function(e){
                        e.preventDefault();
                        window.jMarket.Modules.LogIn.log_in($(this));
                    });
                    $('#sign_up_modal').on('click', window.jMarket.Modules.Modals.signUp.load);
                    $("#slider-range").slider({
                range:true,
                min:0,
                max:1000,
                values:[ 0, 0 ],
                slide:function (event, ui) {
                    $("#min_amount").val(ui.values[ 0 ]);
                    $("#max_amount").val(ui.values[ 1 ]);
                }
            });
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
});