'use strict';

(function() {
    let db = window.app.db;
    let cart = window.app.cart;
    let auth = window.app.auth;
    let search = window.app.search;
    let router = window.app.router;

    let data = {
        searchHeader: function(params) {
            search.search(params.search);
            return search.getResult();
        },
        searchList: function(params) {
            search.search(params.search);
            let data = search.getResult();
            return data ? data.products : [];
        },
        productsHeader: function(params) {
            return db.getStorageRecord('providers', 'id', params.id);
        },
        productsList: function(params) {
            let data = db.getStorageRecord('providers', 'id', params.id);
            return data ? data.products : [];
        },
        providers: function(params) {
            return db.getStorage('providers');
        },
        promo: function(params) {
            return db.getStorage('promo');
        },
        menu: function(params) {
            return db.getStorage('menu');
        },
        social: function(params) {
            return db.getStorage('social');
        }
    };

    let methods = {
        isAuthorized: auth.isAuthorized,
        unauthorizedHandler: function(path) {
            window.location.hash = '';
            auth.open(path);
        }
    };

    cart.init();
    auth.addLoginListener(cart.render);
    auth.init();

    db.init().then(function() {
        router.init('config/router.json', data, methods);
        search.init();
    });
}());
