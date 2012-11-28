var User = {
	_renderProfilePage: function _render_profile_page(data){
		var html = "<div class='well'><div class='user-information'><p><i class='icon-envelope'></i> " + 
					user_info.data[1] + "</p><p><i class='icon-home'></i> "+
					user_info.data[2] + "</p><p><i class='icon-phone'></i> "+
					user_info.data[3] + "</p><p>Rating: <span class='rating_stars'>";
		for(var i=1; i <= parseInt(user_ranking,10); ++i)
			html += "<i class='icon-star'></i>";
		for(var i=1; i < 5-parseInt(user_ranking, 10); ++i)
			html += "<i class='icon-star-empty'></i>";

		html += "</span></p></div><div class='user-actions'>"+
		"<a href='javascript:jMarket.Modules.Modals.createOffer.load();' class='create-review-btn btn btn-jmarket-orange'><i class='icon-edit icon-white'></i> Create User Review</a>"+
    	"<a href='javascript:jMarket.Modules.Modals.changePassword.load();' class='change-password-btn btn btn-jmarket-orange'><i class='icon-edit icon-white'></i> Change Password</a>"+
  		"</div><div class='clearfix'></div></div>";

  		$('div.content_wrapper').html(html);
	},

	getProfilePage: function _get_profile_page(id){
		var data = {
			'function': 'get_user_information',
			'id': id
		};
		$.post(window.jMarket.requestUrl, data, function(data){
			data = JSON.parse(data);
			if(data.error){
				window.jMarket.Modules.DisplayMessage.print(data.error, 'error');
				return;
			} else {
				User._renderProfilePage(data);
			}
		});
	},

	getMyProfile: function _get_my_profile(){
		if($.cookie('user_login')){
			var login = JSON.parse($.cookie('user_login'));
			var data = {
				'fucntion': 'get_user_information',
				'id': login.id
			};
			$.post(window.jMarket.requestUrl, data, function(data){
				data = JSON.parse(data);
				if(data.error){
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