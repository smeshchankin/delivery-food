'use strict';

window.app = window.app || {};
window.app.router = (function() {
    let db = window.app.db;
    let auth = window.app.auth;
    let products = window.app.component.products;
    let productsHeader = window.app.component.productsHeader;
    let providers = window.app.component.providers;
    let providersHeader = window.app.component.providersHeader;
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
                let data = id === 'search' ? search.getResult() : db.getRestaurant(id)
                productsView(data);
            } else {
                window.location.hash = '';
                auth.toggle(id);
            }
        } else {
            providersView(db.getRestaurants());
        }
    }

    function productsView(data) {
        providers.hide();
        providers.destroy();
        providersHeader.hide();
        providersHeader.destroy();

        productsHeader.init(data);
        productsHeader.show();
        products.init(data.products);
        products.show();

        window.scrollTo(0, 0);
    }

    function providersView(data) {
        products.hide();
        products.destroy();
        productsHeader.hide();
        productsHeader.destroy();

        providersHeader.init(data);
        providersHeader.show();
        providers.init(data);
        providers.show();

        window.scrollTo(0, 0);
    }

    return module;
}());
