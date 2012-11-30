var Product = {
	_renderProductInfo: function _render_product_info(data){
		
	},
	getInfo: function _get_info(id){
		var data = {
			function: 'get_product_info',
			id: id
		};
		$.post(window.jMarket.requestUrl, data, function(data){
			if(data.error){
				window.jMarket.Modules.DisplayMessage.print(data.error, "error");
				return;
			} else {
				Product._renderProductInfo(data);
			}
		});
	}
};

window.jMarket.Modules.Product = Product;