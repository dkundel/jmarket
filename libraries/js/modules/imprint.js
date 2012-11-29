var Imprint = {
    modal : $('#modal_container'),
    _load:function(){

        Imprint.modal.load('scripts/imprint/imprint.html').modal();
    }
}


window.jMarket.Modules.Imprint = Imprint;