'use strict';

window.app = window.app || {};
window.app.db = (function() {
    const PATH = 'db/providers.json';
    let restaurants = [];

    let module = {
        init: init,
        getRestaurants: getRestaurants
    };

    async function init() {
        restaurants = [];
        const providers = await getData(PATH);
        let promises = providers.map(async function(provider) {
            provider.tag = provider.time_of_delivery + " min";
            provider.price = "From $" + provider.price + ".00";
            restaurants.push(provider);

            return getData('db/products/' + provider.products).then(function(products) {
                provider.products = [];
                products.forEach(function(product) {
                    product.price = '$' + product.price + ".00";
                    provider.products.push(product);
                });
            });
        });
        return Promise.all(promises);
    }

    function getRestaurants() {
        return restaurants;
    }

    async function getData(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Can\'t read data from ${url}. Status code: ${response.status}`);
        }
        return await response.json();
    }

    return module;
}());
