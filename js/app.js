'use strict';

(function() {
    let filler = window.app.filler;
    let dialog = window.app.dialog;
    let auth = window.app.auth;

    async function getData(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Can\'t read data from ${url}. Status code: ${response.status}`);
        }
        return await response.json();
    }

    let restaurants;
    async function loadProviders(url) {
        restaurants = [];
        const providers = await getData(url);
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

    loadProviders('db/providers.json').then(init);

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

            let restaurantInfo = restaurants.find(function(obj) { return obj.id == id; });

            if (restaurantInfo) {
                filler.populateData('#products', '.card', restaurantInfo.products);
                filler.fillNode(restaurantNode, restaurantInfo);
            }
        } else {
            filler.populateData('#providers', '.card', restaurants);
        }
    }

    let cart = [
        {id: 1, name: 'God Pizza', price: '$43.00', count: 4},
        {id: 2, name: 'The best sushi', price: '$11.99', count: 3},
        {id: 3, name: 'All in one dishes', price: '$19.99', count: 2}
    ];

    const cartModal = document.querySelector('.modal');
    const cartButton = document.querySelector('#cart');
    const closeButton = document.querySelector('.close');
    cartButton.addEventListener('click', dialog.toggle(cartModal));
    closeButton.addEventListener('click', dialog.toggle(cartModal));
    filler.populateData('#product-list', '.product-row', cart);

    auth.init();
}());
