'use strict';

window.app = window.app || {};
window.app.db = (function() {
    let utils = window.app.utils;

    const PATH = 'db/providers.json';
    let storage = {};
    let restaurants = [];


    let module = {
        init: init,
        getStorage: getStorage,
        getRestaurants: getRestaurants,
        getRestaurant: getRestaurant,
        searchProducts: searchProducts,
        productById: productById
    };

    async function init() {
        const config = await utils.getData('config/db.json');
        const promisesConfig = config.map(async function(record) {
            return utils.getData('db/' + record.path).then(function(data) {
                storage[record.name] = data;
            });
        });

        restaurants = [];
        const providers = await utils.getData(PATH);
        const promisesProviders = providers.map(async function(provider) {
            restaurants.push(provider);

            return utils.getData('db/products/' + provider.products).then(function(products) {
                provider.products = products;
            });
        });

        return Promise.all(promisesConfig, promisesProviders);
    }

    function getStorage(name) {
        return storage[name];
    }

    function getRestaurants() {
        return restaurants;
    }

    function getRestaurant(id) {
        return restaurants.find(function(obj) { return obj.id == id; }) || null;
    }

    function searchProducts(str) {
        if (!str) {
            return [];
        }

        let text = str.toLowerCase().trim();
        return restaurants.map(res => res.products).flat()
            .filter(p => p.name.toLowerCase().includes(text));
    }

    function productById(id) {
        return restaurants.map(res => res.products).flat()
            .find(p => p.id === id) || null;
    }

    return module;
}());
