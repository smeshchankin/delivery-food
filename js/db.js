'use strict';

window.app = window.app || {};
window.app.db = (function() {
    let formatter = window.app.formatter;

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
            restaurants.push(formatter.provider(provider));

            return getData('db/products/' + provider.products).then(function(products) {
                provider.products = [];
                products.map(formatter.product).forEach(function(product) {
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
