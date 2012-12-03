/**
 * Module for displaying the search results
 * @type {Object}
 * @author Dominik Kundel
 */
var Search = {
	submit: function _submit(){
		$searchField = $("#product_search");
		search_query = $searchField.val();
		if(search_query.length < 2){
			window.jMarket.Modules.DisplayMessage.print("Search must be at least two characters long.", "info");
			return false;
		} else {
			var data = {
				function: 'search_product',
				product_name: search_query
			};
			var handleResponse = function(data){
				if(data.error){
					window.jMarket.Modules.DisplayMessage.print(data.error, 'error');
					return;
				} else {
                    data = JSON.parse(data);
					window.jMarket.Modules.MainPage.renderData(data);
				}
			}
			$(this).ajaxSubmit({
				url: window.jMarket.requestUrl,
				data: data,
				type: 'POST',
				success: handleResponse
			});
		}
	}
}

window.jMarket.Modules.Search = Search;