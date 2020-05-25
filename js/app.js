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
            return db.getRestaurant(params.id);
        },
        productsList: function(params) {
            let data = db.getRestaurant(params.id);
            return data ? data.products : [];
        },
        providers: function(params) {
            return db.getRestaurants();
        },
        menu: function(params) {
            return db.getMenu();
        },
        social: function(params) {
            return db.getSocial();
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
    });

    search.init();

    new Swiper('.swiper-container', {
        loop: true,
        autoplay: true
    });
}());
