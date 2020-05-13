'use strict';

window.app = window.app || {};
window.app.db = (function() {
    const PATH = 'db/providers.json';
    let restaurants = [];

    let module = {
        init: init,
        getRestaurants: getRestaurants,
        getRestaurant: getRestaurant,
        searchProducts: searchProducts,
        productById: productById
    };

    async function init() {
        restaurants = [];
        const providers = await getData(PATH);
        let promises = providers.map(async function(provider) {
            restaurants.push(provider);

            return getData('db/products/' + provider.products).then(function(products) {
                provider.products = products;
            });
        });
        return Promise.all(promises);
    }

    function getRestaurants() {
        return restaurants;
    }

    function getRestaurant(id) {
        return restaurants.find(function(obj) { return obj.id == id; })
    }

    function searchProducts(str) {
        let text = str.toLowerCase().trim();
        return restaurants.map(res => res.products).flat()
            .filter(p => p.name.toLowerCase().includes(text));
    }

    function productById(id) {
        return restaurants.map(res => res.products).flat()
            .find(p => p.id === id);
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
