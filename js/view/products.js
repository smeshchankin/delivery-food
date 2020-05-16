'use strict';

window.app = window.app || {};
window.app.view = window.app.view || {};
window.app.view.products = (function() {
    let utils = window.app.utils;
    let filler = window.app.filler;
    let formatter = window.app.formatter;

    let module = {
        init: init,
        destroy: destroy,
        show: show,
        hide: hide
    };

    let elems = {
        restaurantTemplate: '#restaurant-info',
        template: '#products > .card'
    };
    elems = utils.applySelector(elems);

    let nodes = [];

    function init(restaurantInfo) {
        if (restaurantInfo) {
            nodes.push(...filler.populate(elems.restaurantTemplate, restaurantInfo, formatter.provider));
            nodes.push(...filler.populate(elems.template, restaurantInfo.products, formatter.product));
        }
    }

    function destroy() {
        filler.delete(nodes);
    }

    function show() {
    }

    function hide() {
        filler.hide(nodes);
    }

    return module;
}());
