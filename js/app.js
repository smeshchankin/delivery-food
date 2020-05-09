'use strict';

(function() {
    let db = window.app.db;
    let cart = window.app.cart;
    let auth = window.app.auth;
    let products = window.app.view.products;
    let providers = window.app.view.providers;

    db.init().then(init);

    window.addEventListener('hashchange', function(event) {
        init();
    });

    function init() {
        let id = window.location.hash.replace('#', '');
        if (id) {
            providers.hide();

            let restaurantInfo = db.getRestaurants().find(function(obj) { return obj.id == id; });
            products.init(restaurantInfo);
            products.show();
        } else {
            providers.init(db.getRestaurants());
            providers.show();
            products.hide();
        }
    }

    cart.init();
    auth.init();
}());
