var MainPage = {
    requestData:{
        function:"construct_main_page"
    },
    renderData:function _render_data(data) {
        var content = '<div class="row-fluid"><ul class="thumbnails">';
        var content_data = data.products;
        for (var i = 0; i < content_data.length; ++i) {
            content += '<li class="span3 product"><div class="thumbnail">' +
                '<img src="http://placehold.it/300x200" alt=""><div class="caption">';
            content += '<h3>' + content_data[i][1] + '</h3>';
            content += '<p>' + content_data[i][2] + '</p>';
            content += '<p class="caption_bottom"><a href="javascript:window.jMarket.Modules.Product.getInfo(' + content_data[i][0] + ');" class="btn btn-jmarket-orange"><i class="icon-share icon-white"></i> Details</a></p>';
            content += '<h3 class="price-tag">' + content_data[i][3] + '</h3>';
            content += '<div class="clearfix"></div></div></div></li>';
        }
        content += "</ul></div>"
        $('div.content_wrapper').html(content);

        nav_content = data.categories;
        nav_list = $('div.nav_bar_left').find('ul#category_list');
        var nav_html = '<li class="nav-header">Categories</li><li><a href="#">All</a></li>';
        for (var i = 0; i < nav_content.length; ++i) {
            nav_html += '<li><a style="text-transform: capitalize; cursor: pointer" data-category-id="' + nav_content[i][0] + '">' + nav_content[i][1] + '<span style="margin-left: 5px" class="badge badge-info">' + nav_content[i][2] + '</span></a></li>';
        }
        nav_list.html(nav_html);
    },
    load:function _load() {
        $.post(window.jMarket.requestUrl, MainPage.requestData, function (data) {
            data = JSON.parse(data);
            if (data.error) {
                window.jMarket.Modules.DisplayMessage.print(data.error, "error");
                return;
            }
            MainPage.renderData(data);
        });
    }
};

window.jMarket.Modules.MainPage = MainPage;
