'use strict';

window.app = window.app || {};
window.app.formatter = (function() {
    let module = {
        provider: formatProvider,
        product: formatProduct
    };

    function formatProvider(obj) {
        obj.tag = obj.time_of_delivery + " min";
        obj.price = "From $" + obj.price + ".00";
        return obj;
    }

    function formatProduct(obj) {
        obj.price = '$' + obj.price + ".00";
        return obj;
    }

    return module;
}());
