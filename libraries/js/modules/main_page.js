var MainPage = {
    requestData:{
        function:"construct_main_page"
    },
    renderData:function _render_data(data, navbar) {
        if (data.error) {
            window.jMarket.Modules.DisplayMessage.print(data.error, "error");
            return;
        }
        var content = '<div class="row-fluid"><ul class="thumbnails">';
        var content_data = data.products;
        if (data.products.length == 0) {
            content = "No products available."
        } else {
            for (var i = 0; i < content_data.length; ++i) {
                content += '<li class="span3 product"><div class="thumbnail" style="height: 400px;">' +
                    '<img src="' + content_data[i][4] + '" alt=""><div class="caption">';
                content += '<h3>' + content_data[i][1] + '</h3>';
                content += '<div style="height: 100px; overflow: hidden; text-overflow: ellipsis;">' + content_data[i][2] + '</div>';
                content += '<p class="caption_bottom"><a href="javascript:window.jMarket.Modules.Product.getInfo(' + content_data[i][0] + ');" class="btn btn-jmarket-orange"><i class="icon-share icon-white"></i> Details</a></p>';
                content += '<h3 class="price-tag">' + content_data[i][3] + '</h3>';
                content += '<div class="clearfix"></div></div></div></li>';
            }
            content += "</ul></div>"
        }

        $('div.content_wrapper').html(content);

        if (navbar) {
            MainPage.renderNavbar(data);
        }
    },

    renderNavbar:function (data) {
        nav_content = data.categories;
        nav_list = $('div.nav_bar_left').find('ul#category_list');
        var nav_html = '<li class="nav-header">Categories</li><li class="filter-all"><a>All</a></li>';
        for (var i = 0; i < nav_content.length; ++i) {
            nav_html += '<li class="filter-checkbox"  data-category-id="' + nav_content[i][0] + '"><a style="text-transform: capitalize; cursor: pointer" >' + nav_content[i][1] + '</a></li>';
        }
        nav_list.html(nav_html);
        MainPage._init_filters();
    },

    load:function _load(navbar) {
        $.post(window.jMarket.requestUrl, MainPage.requestData, function (data) {
            data = JSON.parse(data);
            if (data.error) {
                window.jMarket.Modules.DisplayMessage.print(data.error, "error");
                return;
            }
            MainPage.renderData(data, navbar);
        });
    },

    _init_filters:function () {
        var filter_container = $('div.nav_bar_left');
        var filter_all = filter_container.find('li.filter-all');
        var filter_one = filter_container.find('li.filter-checkbox');
        var filter_button = filter_container.find('button.apply-filter');

        filter_all.live('click', function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
            } else {
                $(this).addClass('active');
                filter_one.removeClass('active');
            }
        });

        filter_one.live('click', function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
            } else {
                $(this).addClass('active');
                filter_all.removeClass('active');
            }
        });


        filter_button.live('click', function () {
            var category_ids = new Array();
            var filter = "some";
            var min_price;
            var max_price;

            min_price = filter_container.find('input#min_price').val();
            max_price = filter_container.find('input#max_price').val();


            if (filter_container.find('li.filter-all').hasClass('active')) {
                filter = "all";
            } else {
                filter_container.find('li.active.filter-checkbox').each(function () {
                    category_ids.push($(this).data('category-id'));
                });
            }

            if (filter == "some" && category_ids.length == 0) {
                window.jMarket.Modules.DisplayMessage.print("Please select some categories for filters", "info");
                return;
            }

            var data = {
                function:'filter_products',
                min_price:min_price,
                max_price:max_price,
                filter:filter,
                category_ids:category_ids.join(',')
            }
            $.post(window.jMarket.requestUrl, data, function (data) {
                data = JSON.parse(data);
                MainPage.renderData(data);
            });

        });
    }
};

window.jMarket.Modules.MainPage = MainPage;
