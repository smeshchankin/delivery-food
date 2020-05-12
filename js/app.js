'use strict';

(function() {
    let db = window.app.db;
    let cart = window.app.cart;
    let auth = window.app.auth;
    let search = window.app.search;
    let router = window.app.router;

    db.init()
        .then(router.init);

    cart.init();
    auth.init();
    search.init();

    new Swiper('.swiper-container', {
        loop: true,
        autoplay: true
    });
}());
