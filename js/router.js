'use strict';

window.app = window.app || {};
window.app.router = (function() {
    let db = window.app.db;
    let auth = window.app.auth;
    let products = window.app.view.products;
    let providers = window.app.view.providers;

    let module = {
        init: init
    };

    function init() {
        window.addEventListener('hashchange', route);
        route();
    }

    function route() {
        let id = window.location.hash.replace('#', '');
        if (id) {
            if (auth.isAuthorized()) {
                providers.hide();
                products.init(db.getRestaurant(id));
                products.show();
            } else {
                window.location.hash = '';
                auth.toggle();
            }
        } else {
            products.hide();
            providers.init(db.getRestaurants());
            providers.show();
        }
    }

    return module;
}());