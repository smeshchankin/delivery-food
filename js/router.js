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
                productsView(id, id === 'search' ?
                    search.getResult() : db.getRestaurant(id));
            } else {
                window.location.hash = '';
                auth.toggle(id);
            }
        } else {
            providersView(id, db.getRestaurants());
        }
    }

    function productsView(path, data) {
        providers.hide();
        providers.destroy();
        products.init(data);
        products.show();
        window.scrollTo(0, 0);
    }

    function providersView(path, data) {
        products.hide();
        products.destroy();
        providers.init(data);
        providers.show();
        window.scrollTo(0, 0);
    }

    return module;
}());
