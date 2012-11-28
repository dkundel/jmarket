var DisplayMessage = {
    type: new Array(
        'info',
        'success',
        'error',
        'warning'
    ),
    print:function(message, type){
        if (DisplayMessage.type.indexOf(type) == -1){
            return;
        }

        var close = $('<a style="cursor: pointer; float: right; margin-right: 10px;" onclick="javascript:$(this).parent().fadeOut(function(){$(this).remove()});"><i class="icon-remove-circle"></i></a>');
        $('body').append( $('<div style="position: absolute; top: 25px; left: 25%; word-wrap: break-word;" class="alert alert-'+type+' span7 box-shadow">'+message+'</div>').prepend(close).fadeIn() );
    }
};

window.jMarket.Modules.DisplayMessage = DisplayMessage;