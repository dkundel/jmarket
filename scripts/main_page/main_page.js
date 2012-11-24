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
            this._build_content_page();
            this._display_page();
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
                console.log(data);
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

