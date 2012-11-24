(function () {

    function MainPage() {
        this._init();
    }

    MainPage.prototype = {
        /**
         *
         */
        data_content:null,
        /**
         *
         */
        page_html:null,
        /**
         *
         */
        container:null,
        /**
         *
         * @private
         */
        _init:function () {
            this.container = $('div.content_wrapper');
            this._fetch_content();
            //this._build_content_page();
            //this._display_page();
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
                for(var i=0; i < data.length; ++i){
                        content += '<li class="span3 product"><div class="thumbnail">'+
                        '<img src="http://placehold.it/300x200" alt=""><div class="caption">';
                        content += '<h3>' + data[i][1] + '</h3>';
                        content += '<p>' + data[i][2] + '</p>';
                        content += '<p class="caption_bottom"><a href="#' + data[i][0] + '" class="btn btn-jmarket-orange"><i class="icon-share icon-white"></i> Details</a></p>';
                        content += '<h3 class="price-tag">' + data[i][3] + '</h3>';
                        content += '<div class="clearfix"></div></div></div></li>';
                }
                this.page_html = content;
                $('div.content_wrapper').html(content);
            });
        },
        /**
         *
         * @param item
         * @private
         */
        _build_product_container:function (item) {

        },
        _build_content_page:function () {

        },
        _display_page:function () {
            this.container.html(this.page_html);
        }

    }

    window.jMarket.Modules.MainPage = MainPage;


})();

