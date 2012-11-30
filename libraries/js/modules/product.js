var Product = {
	_renderProductInfo: function _render_product_info(data){
		var user_id = (JSON.parse($.cookie('user_login'))).user_id;
		data = data.product_info;
		var html = '<div class="row"><div class="span10">';
		html += '<h3>' + data[1] + '</h3>';
		html += '<div class="row"><div class="span4"><div class="thumbnail">';
		html += '<img src="' + data[3] + '" alt="Product No. ' + data[0] + '">';
		html += '</div></div><div class="span6">';
		html += '<p>' + data[2] + '</p>';
		html += '<p><h3 class="price-tag">' + data[4] + '</h3>&nbsp;';
		html += '<a class="btn btn-jmarket-orange" href="mailto:' + data[7] + '">Contact Seller</a>';
		if(data[6] == user_id)
			html += '<a class="btn btn-jmarket-orange" href="javascript:window.jMarket.Modules.Product.delete(' + data[0] + ')">Delete Product</a>';
		html += '</p></div>';
		html += '</div><div class="row"><div class="span10"><p></p>';
		html += '<p><i class="icon-user"></i> by <a href="javascript:window.jMarket.Modules.User.getProfilePage(' + data[6] +');">';
		html += (data[7].split("@jacobs-university.de"))[0] + "</a> | ";
		html += '<i class="icon-tags"></i> Category : <span class="label label-warning">' + data[8] + '</span>';
		html += '</p></div>';
		$('div.content_wrapper').html(html);
	},
	getInfo: function _get_info(id){
		var data = {
			function: 'get_product_info',
			id: id
		};
		$.post(window.jMarket.requestUrl, data, function(data){
			data = JSON.parse(data);
			if(data.error){
				window.jMarket.Modules.DisplayMessage.print(data.error, "error");
				return;
			} else {
					Product._renderProductInfo(data);
			
			}
		});
	},
	delete: function _delete(id){
		var user_login = JSON.parse($.cookie('user_login'));
		if(!user_login){
			window.jMarket.Modules.DisplayMessage.print("User is not logged in.", "error");
			return;
		}
		var data = {
			function: 'delete_product',
			id: id
		};
		$.post(window.jMarket.requestUrl, data, function(data){
			data = JSON.parse(data);
			if(data.error){
				window.jMarket.Modules.DisplayMessage.print(data.error, "error");
				return;
			} else {
				window.jMarket.Modules.DisplayMessage.print("Product with ID " + id + " has been deleted", "success");
				window.jMarket.Modules.MainPage.load();
			}
		});
	}
};

window.jMarket.Modules.Product = Product;