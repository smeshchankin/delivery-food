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
        products: '#products'
    };
    elems = utils.applySelector(elems);

    function init(restaurantInfo) {
        if (restaurantInfo) {
            filler.fillNode(elems.restaurant, restaurantInfo);
            filler.populateData('#products', '.card', restaurantInfo.products);
        }
    }

    function show() {
        elems.restaurant.classList.remove('hide');
        elems.products.classList.remove('hide');
    }

    function hide() {
    }

    return module;
}());
