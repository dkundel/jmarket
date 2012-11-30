var Product = {
	_renderProductInfo: function _render_product_info(data){
		var html = '<div class="row"><div class="span10">';
		html += '<h3>' + data[1] + '</h3>';
		html += '<div class="row"><div class="span4"><div class="thumbnail">';
		html += '<img src="' + data[3] + '" alt="Product No. ' + data[0] + '">';
		html += '</div></div><div class="span6">';
		html += '<p>' + data[2] + '</p>';
		html += '<p><h3 class="price-tag">' + data[5] + '</h3>&nbsp;';
		html += '<a class="btn btn-jmarket-orange" href="mailto:' + data[8] + '">Contact Seller</a></p></div>';
		html += '</div><div class="row"><div class="span10"><p></p>';
		html += '<p><i class="icon-user"></i> by <a href="javascript:window.jMarket.Modules.User.getProfilePage(' + user[7] +');">';
		html += (data[8].split("@jacobs-university.de"))[0] + "</a> | ";
		html += '<i class="icon-calendar"></i> ' + (new Date(data[4])).toLocaleDateString() + " | ";
		html += '<i class="icon-tags"></i> Category : <span class="label label-warning">' + data[9] + '</span>';
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
				if(data.length == 10){
					Product._renderProductInfo(data);
				} else {
					window.jMarket.Modules.DisplayMessage.print("Not enough information for this product!", "error");
				}
			}
		});
	}
};

window.jMarket.Modules.Product = Product;