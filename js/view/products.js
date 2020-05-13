'use strict';

window.app = window.app || {};
window.app.view = window.app.view || {};
window.app.view.products = (function() {
    let utils = window.app.utils;
    let filler = window.app.filler;
    let formatter = window.app.formatter;

    let module = {
        init: init,
        show: show,
        hide: hide
    };

    let elems = {
        restaurant: '#restaurant-info',
        list: '#products',
        template: '#products > .card'
    };
    elems = utils.applySelector(elems);

    function init(restaurantInfo) {
        if (restaurantInfo) {
            filler.fillNode(elems.restaurant, restaurantInfo, formatter.provider);
            filler.populateData(elems.list, elems.template, restaurantInfo.products, formatter.product);
        }
    }

    function show() {
        elems.restaurant.classList.remove('hide');
        elems.list.classList.remove('hide');
    }

    function hide() {
        elems.restaurant.classList.add('hide');
        elems.list.classList.add('hide');
    }

    return module;
}());
