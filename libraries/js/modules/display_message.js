/**
 * Module for displaying the user message
 * @type {Object}
 * @author George Merticariu
 */
var DisplayMessage = {
    /*
     * type of messages
     */
    type:new Array(
        'info',
        'success',
        'error',
        'warning'
    ),
    /*
     * print function
     * @param String message - the message to be printed
     * @param String type - type of message (must be in type array)
     */
    print:function (message, type) {
        if (DisplayMessage.type.indexOf(type) == -1) {
            return;
        }
        //remove the current user message
        $('.user-message').remove();

        //create close button
        var close = $('<a style="cursor: pointer; float: right; margin-right: 10px;" onclick="javascript:$(this).parent().fadeOut(function(){$(this).remove()});"><i class="icon-remove-circle"></i></a>');

        //display it to the user
        $('body').append($('<div style="position: fixed; top: 25px; left: 25%; word-wrap: break-word; z-index: 10000" class="alert alert-' + type + ' span7 box-shadow user-message">' + message + '</div>').prepend(close).fadeIn());

        //remove the message after 5 seconds
        setTimeout(function () {
            $('.user-message').remove();
        }, 5000);
    }
};

window.jMarket.Modules.DisplayMessage = DisplayMessage;