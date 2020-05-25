'use strict';

window.app = window.app || {};
window.app.component = window.app.component || {};
window.app.component.promo = (function() {
    let utils = window.app.utils;
    let filler = window.app.filler;

    let module = {
        init: init,
        destroy: destroy,
        show: show,
        hide: hide
    };

    let template = '.promo';
    template = utils.applySelector(template);

    let nodes = [];
    let swiper;

    function init(list) {
        nodes = filler.populate(template, list);
        swiper = new Swiper('.swiper-container');
    }

    function destroy() {
        swiper.destroy(true, false);
        filler.delete(nodes);
        nodes = [];
    }

    function show() {
    }

    function hide() {
    }

    return module;
}());