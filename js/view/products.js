'use strict';

window.app = window.app || {};
window.app.view = window.app.view || {};
window.app.view.products = (function() {
    let filler = window.app.filler;
    let utils = window.app.utils;

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
            filler.fillNode(elems.restaurant, restaurantInfo);
            filler.populateData(elems.list, elems.template, restaurantInfo.products);
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
