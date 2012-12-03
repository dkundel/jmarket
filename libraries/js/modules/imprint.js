/**
 * Module for displaying the imprint
 * @type {Object}
 * @author George Merticariu
 */

var Imprint = {
    /**
     * modal window container
     */
    modal : $('#modal_container'),

    /**
     * load the html into a modal window
     *
     */
    _load:function(){

        Imprint.modal.load('scripts/imprint/imprint.html').modal();
    }
}


window.jMarket.Modules.Imprint = Imprint;