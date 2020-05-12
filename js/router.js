'use strict';

window.app = window.app || {};
window.app.router = (function() {
    let db = window.app.db;
    let auth = window.app.auth;
    let products = window.app.view.products;
    let providers = window.app.view.providers;
    let search = window.app.search;

    let module = {
        init: init,
        go: go
    };

    function init() {
        window.addEventListener('hashchange', route);
        route();
    }

    function go(path) {
        window.location.hash = path || '';
        route();
    }

    function route() {
        let id = window.location.hash.replace('#', '');
        if (id) {
            if (auth.isAuthorized()) {
                providers.hide();
                products.init(id === 'search' ? search.getResult() : db.getRestaurant(id));
                products.show();
            } else {
                window.location.hash = '';
                auth.toggle(id);
            }
        } else {
            products.hide();
            providers.init(db.getRestaurants());
            providers.show();
        }
    }

    return module;
}());
