'use strict';

(function() {
    let db = window.app.db;
    let filler = window.app.filler;
    let cart = window.app.cart;
    let auth = window.app.auth;

    db.init().then(init);

    window.addEventListener('hashchange', function(event) {
        init();
    });

    function init() {
        let id = window.location.hash.replace('#', '');
        if (id) {
            document.querySelector('.restaurants-header').classList.add('hide');

            let restaurantNode = document.querySelector('#restaurant-info');
            restaurantNode.classList.remove('hide');

            document.querySelector('#providers').classList.add('hide');
            document.querySelector('#products').classList.remove('hide');

            let restaurantInfo = db.getRestaurants().find(function(obj) { return obj.id == id; });

            if (restaurantInfo) {
                filler.populateData('#products', '.card', restaurantInfo.products);
                filler.fillNode(restaurantNode, restaurantInfo);
            }
        } else {
            filler.populateData('#providers', '.card', db.getRestaurants());
        }
    }

    cart.init();
    auth.init();
}());
