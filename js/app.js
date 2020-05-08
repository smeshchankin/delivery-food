'use strict';

(function() {
    let module = window.app.module;
    module.bar(module.foo());

    async function getData(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Can\'t read data from ${url}. Status code: ${response.status}`);
        }
        return await response.json();
    }

    let restaurants;
    async function loadProviders(url) {
        return getData(url).then(function(providers) {
            restaurants = [];
            providers.forEach(function(provider) {
                provider.tag = provider.time_of_delivery + " min";
                provider.price = "From $" + provider.price + ".00";
                restaurants.push(provider);
                getData('db/products/' + provider.products).then(function(products) {
                    provider.products = [];
                    products.forEach(function(product) {
                        product.price = '$' + product.price + ".00";
                        provider.products.push(product);
                    });
                })
            });
        });
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
                populateData('#products', '.card', restaurantInfo.products);
                fillNode(restaurantNode, restaurantInfo);
            }
        } else {
            populateData('#providers', '.card', restaurants);
        }
    }

    let cart = [
        {id: 1, name: 'God Pizza', price: '$43.00', count: 4},
        {id: 2, name: 'The best sushi', price: '$11.99', count: 3},
        {id: 3, name: 'All in one dishes', price: '$19.99', count: 2}
    ];

    const modal = document.querySelector('.modal');
    const cartButton = document.querySelector('#cart');
    const closeButton = document.querySelector('.close');
    cartButton.addEventListener('click', toggleModal(modal));
    closeButton.addEventListener('click', toggleModal(modal));
    populateData('#product-list', '.product-row', cart);


    const modalAuth = document.querySelector('.modal-auth');
    const loginButton = document.querySelector('#loginButton');
    const closeAuthButton = document.querySelector('.close-auth');
    loginButton.addEventListener('click', toggleModal(modalAuth));
    closeAuthButton.addEventListener('click', toggleModal(modalAuth));

    const signInForm = document.querySelector('#logInForm');
    signInForm.addEventListener('submit', submitHandler);
    const usernameLabel = document.querySelector('.user-name');
    const usernameText = document.querySelector('#login');
    const logoutButton = document.querySelector('#logouButton');
    logoutButton.addEventListener('click', logoutHandler);

    const savedUsername = localStorage.getItem('delivery-food.username') || '';
    login(savedUsername);


    function toggleModal(elem) {
        return function() {
            elem.classList.toggle('is-open');
        }
    }

    function submitHandler(event) {
        event.preventDefault();
        if (login(usernameText.value)) {
            toggleModal(modalAuth)();
            usernameText.style.borderColor = '';
        } else {
            usernameText.style.borderColor = 'red';
        }
    }

    function logoutHandler() {
        login('');
    }

    function login(username) {
        let login = username.trim();
        if (login) {
            usernameLabel.textContent = login;
            loginButton.style.display = 'none';
            logoutButton.style.display = '';
        } else {
            usernameLabel.textContent = '';
            loginButton.style.display = '';
            logoutButton.style.display = 'none';
        }
        localStorage.setItem('delivery-food.username', login);

        usernameText.value = '';

        return login;
    }

    function populateData(parentSelector, templateSelector, data) {
        let parentNode = document.querySelector(parentSelector);
        let templateNode = parentNode.querySelector(templateSelector);
        parentNode.removeChild(templateNode);

        if (data) {
            for (let i = 0; i < data.length; i++) {
                let node = templateNode.cloneNode(true);
                parentNode.appendChild(fillNode(node, data[i]));
            }
        }
    }

    function fillNode(node, data) {
        if (node.href && data.id) {
            node.href = node.href.replace('{{id}}', data.id);
        }
        if (node.id && data.id) {
            node.id = node.id.replace('{{id}}', data.id);
        }
        if (data.image) {
            node.innerHTML = node.innerHTML.replace('img/dummy.jpg', data.image);
        }

        Object.keys(data).forEach(function(key) {
            let value = data[key];
            node.innerHTML = node.innerHTML.replace('{{' + key + '}}', value);
        });

        return node;
    }
}());