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
        restaurantTemplate: '#restaurant-info',
        list: '#products',
        restaurant: '#undefined',
        template: '#products > .card'
    };
    elems = utils.applySelector(elems);

    function init(restaurantInfo) {
        if (restaurantInfo) {
            elems.restaurant = filler.populate(elems.restaurantTemplate, restaurantInfo, formatter.provider);
            filler.populate(elems.template, restaurantInfo.products, formatter.product);
        }
    }

    function show() {
        elems.list.classList.remove('hide');
    }

    function hide() {
        elems.list.classList.add('hide');
        if (elems.restaurant) {
            elems.restaurant.classList.add('hide');
        }
    }

    return module;
}());
