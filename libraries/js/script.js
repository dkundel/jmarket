/* Author:

*/
window.jMarket = {};
window.jMarket.Modules = {};

window.jMarket.requestUrl = "scripts/load_function.psp";

function test_request(function_name) {
            var data = {
                function:'sign_in',
                user:'g.merticariu@jacobs-university.de',
                password:'password123'
            }
            $.post("scripts/load_function.psp", data, function (data) {
                data = JSON.parse(data);

            });
        }

