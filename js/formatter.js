'use strict';

window.app = window.app || {};
window.app.formatter = (function() {
    let module = {
        provider: formatProvider,
        product: formatProduct,
        price: formatPrice
    };

    function formatProvider(obj) {
        obj.tag = obj.time_of_delivery + ' min';
        obj.price = 'From ' + formatPrice(obj.price);
        return obj;
    }

    function formatProduct(obj) {
        obj.price = formatPrice(obj.price);
        return obj;
    }

    function formatPrice(price) {
        return '$' + price + '.00';
    }

    return module;
}());
