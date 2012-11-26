(function () {

    function MainPage() {
        this._init();
    }

    MainPage.prototype = {
        /**
         *
         * @private
         */
        _init:function () {
            this._fetch_content();
        },
        /**
         *
         * @private
         */
        _fetch_content:function () {
            var data = {
                function:"get_latest_offers"
            }
            $.post("scripts/load_function.psp", data, function (data) {
                data = JSON.parse(data);
                content = '<div class="row-fluid"><ul class="thumbnails">';
                for (var i = 0; i < data.length; ++i) {
                    content += '<li class="span3 product"><div class="thumbnail">' +
                        '<img src="http://placehold.it/300x200" alt=""><div class="caption">';
                    content += '<h3>' + data[i][1] + '</h3>';
                    content += '<p>' + data[i][2] + '</p>';
                    content += '<p class="caption_bottom"><a href="#' + data[i][0] + '" class="btn btn-jmarket-orange"><i class="icon-share icon-white"></i> Details</a></p>';
                    content += '<h3 class="price-tag">' + data[i][3] + '</h3>';
                    content += '<div class="clearfix"></div></div></div></li>';
                }
                content+="</ul></div>"
                $('div.content_wrapper').html(content);
            });
        }

    }

    window.jMarket.Modules.MainPage = MainPage;


})();

