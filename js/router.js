'use strict';

window.app = window.app || {};
window.app.router = (function() {
    let db = window.app.db;
    let products = window.app.view.products;
    let providers = window.app.view.providers;

    let module = {
        init: init,
        route: route
    };

    function init() {
        window.addEventListener('hashchange', route);
        route();
    }

    function route() {
        let id = window.location.hash.replace('#', '');
        if (id) {
            providers.hide();

            products.init(db.getRestaurant(id));
            products.show();
        } else {
            providers.init(db.getRestaurants());
            providers.show();

            products.hide();
        }
    }

    return module;
}());
