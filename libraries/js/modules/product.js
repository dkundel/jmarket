var Product = {
    _renderProductInfo:function _render_product_info(data, user_products) {
        var html = '<div class="row" style="margin: 0"><div class="span10">';
        html += '<h3>' + data[1] + '</h3>';
        html += '<div class="row" style="margin: 0"><div class="span4"><div class="thumbnail">';
        html += '<img src="' + data[3] + '">';
        html += '</div></div><div class="span6">';
        html += '<p>' + data[2] + '</p>';
        html += '<p>';
        html += '</p></div>';
        html += '</div><div class="row" style="margin: 0"><div class="span10"><p></p>';
        html += '<p><i class="icon-user"></i> by <a href="javascript:window.jMarket.Modules.User.getProfilePage(' + data[6] + ');">';
        html += (data[7].split("@jacobs-university.de"))[0] + "</a> | ";
        html += '<i class="icon-tags"></i> Category : <span class="label label-warning">' + data[8] + '</span>';

        var action_button;
        if (user_products) {
            action_button = '<button class="btn btn-danger" style="float: right; margin-left: 10px;" onclick="window.jMarket.Modules.Product.delete(' + data[0] + ')">Delete</button>';
            action_button += '<button class="btn btn-primary" style="float: right; margin-left: 10px;" onclick="window.jMarket.Modules.Product.edit(' + data[0] + ')">Edit</button>';

        } else {
            action_button = '<a class="btn btn-jmarket-orange" href="mailto:' + data[7] + '">Contact Seller</a> ';
        }

        html += '</p>' + action_button + '<h3 class="price-tag">' + data[4] + '</h3>&nbsp;</div></div></div></div>';
        return html;

    },
    getInfo:function _get_info(id) {
        var data = {
            function:'get_product_info',
            id:id
        };
        $.post(window.jMarket.requestUrl, data, function (data) {
            data = JSON.parse(data);
            if (data.error) {
                window.jMarket.Modules.DisplayMessage.print(data.error, "error");
                return;
            } else {
                $('div.content_wrapper').html(Product._renderProductInfo(data.product_info));
            }
        });
    },
    delete:function _delete(id) {
        if (!$.cookie('user_login')) {
            return;
        }

        var user_info = JSON.parse($.cookie('user_login'));


        var confirm = window.confirm("Delete product?");
        if (confirm) {
            var data = {
                function:'delete_product',
                product_id:id,
                user_id:user_info.user_id

            };
            $.post(window.jMarket.requestUrl, data, function (data) {
                data = JSON.parse(data);
                if (data.error) {
                    window.jMarket.Modules.DisplayMessage.print(data.error, "error");
                    return;
                } else {
                    window.jMarket.Modules.DisplayMessage.print("Product has been deleted", "success");
                    Product.getMyProducts();
                }
            });
        }
    },

    edit:function(id){
        if (!$.cookie('user_login')){
            return;
        }

        $('body').modalmanager('loading');

        setTimeout(function () {
            Modals.modal.load('scripts/edit_product/edit_product.html', '', function () {
                Modals.modal.modal();
                setTimeout(function(){
                    $('button#save_edit_product').click(function () {
                        var form = $('form#edit_offer_form');

                        data={
                            function:'edit_offer',
                            id: id,
                            name:form.find('input[name="name"]').val(),
                            description: form.find('textarea#description').val(),
                            price: form.find('input[name="price"]').val()
                        }

                        $.post(window.jMarket.requestUrl,data,function(data){
                            data = JSON.parse(data);
                            if (data.error){
                                window.jMarket.Modules.DisplayMessage.print(data.error,'error');
                                return;
                            }

                            Modals.modal.modal('hide');
                            window.jMarket.Modules.DisplayMessage.print("Successfully saved.", "success");
                            Product.getMyProducts();

                        });
                    });
                },500);
            });

            var data = {
                function:'get_product_info',
                id:id
            }

            $.post(window.jMarket.requestUrl, data, function (data) {

                data = JSON.parse(data);
                if (data.error) {
                    window.jMarket.Modules.DisplayMessage.print(data.error, 'error');
                    return;
                }
                var product_info = data.product_info;
                //1 -> name
                //2 -> description
                //4 -> price
                //6 -> user_id
                var user_id = JSON.parse($.cookie('user_login')).user_id;
                $('input[name="user_id"]').val(user_id);

                if (user_id!=product_info[6]){
                    window.jMarket.Modules.DisplayMessage.print("Product does not belong to user.",'error');
                    return;
                }
                var form = Modals.modal.find('form');
                form.find('input[name="name"]').val(product_info[1]);
                form.find('textarea#description').text(product_info[2]);
                form.find('input[name="price"]').val(product_info[4]);
            });

        }, 500);

    },

    getMyProducts:function () {
        if (!$.cookie('user_login')) {
            return;
        }

        user_info = JSON.parse($.cookie('user_login'));

        var data = {
            function:'get_user_products',
            user_id:user_info.user_id
        }

        $.post(window.jMarket.requestUrl, data, function (data) {
            data = JSON.parse(data);
            if (data.error) {
                window.jMarket.Modules.DisplayMessage.print(data.error, "error");
                return;
            }

            var html = "";
            if (data.user_products.length == 0) {
                html = "No products to sale."
            } else {
                for (var i in data.user_products) {
                    html += Product._renderProductInfo(data.user_products[i], true);
                }
            }
            $('div.content_wrapper').html(html);
        });
    }
};

window.jMarket.Modules.Product = Product;