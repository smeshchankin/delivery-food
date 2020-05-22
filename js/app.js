'use strict';

(function() {
    let db = window.app.db;
    let cart = window.app.cart;
    let auth = window.app.auth;
    let search = window.app.search;
    let router = window.app.router;

    let data = {
        search: function(params) {
            search.search(params.search);
            let data = search.getResult();
            return [data.products, data];
        },
        products: function(params) {
            let data = db.getRestaurant(params.id);
            if (data) {
                return [data.products, data];
            } else {
                return [];
            }
        },
        providers: function(params) {
            return [db.getRestaurants()];
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
