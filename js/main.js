(function() {
    let restaurants = [
        {id: 1, img: '01.jpg', title: 'Pizza Burger', tag: '50 min', rating: 4.5, price: 'From $9.99', category: 'Pizza', products: []},
        {id: 2, img: '02.jpg', title: 'Pizza Minus Minus', tag: '150 min', rating: 4.1, price: 'From $4.99', category: 'Pizza, Rolls, Sushi', products: [
            {img: '01.jpg', title: 'Roll eel standard', ingredients: 'Rice, eel, unagi sauce, sesame, nori seaweed.', price: '$16.66'},
            {img: '02.jpg', title: 'California Salmon Standard', ingredients: 'Rice, salmon, avocado, cucumber, mayonnaise, masago caviar, nori seaweed.', price: '$6.66'},
            {img: '03.jpg', title: 'Okinawa standard', ingredients: 'Rice, boiled shrimp, cream cheese, salmon, fresh cucumber ...', price: '$7.77'},
            {img: '04.jpg', title: 'Цезарь маки хl', ingredients: 'Rice, smoked chicken breast, masago caviar, tomato, iceberg, Caesar dressing ...', price: '$3.33'}
        ]},
        {id: 3, img: '03.jpg', title: 'Pizza Plus Plus', tag: '50 min', rating: 4.5, price: 'From $9.99', category: 'Pizza', products: [
            {img: '05.jpg', title: 'Yasai Maki standard 185 g', ingredients: 'Rice, fresh tomato, bell pepper, avocado, cucumber, iceberg', price: '$8.88'},
            {img: '06.jpg', title: 'Shrimp Roll Standard', ingredients: 'Rice, nori seaweed, boiled shrimp, cream cheese, cucumbers', price: '$4.44'}
        ]},
        {id: 4, img: '04.jpg', title: 'Pizza Minus Minus', tag: '150 min', rating: 4.1, price: 'From $4.99', category: 'Pizza', products: [
            {img: '02.jpg', title: 'California Salmon Standard', ingredients: 'Rice, salmon, avocado, cucumber, mayonnaise, masago caviar, nori seaweed.', price: '$6.66'},
            {img: '03.jpg', title: 'Okinawa standard', ingredients: 'Rice, boiled shrimp, cream cheese, salmon, fresh cucumber ...', price: '$7.77'},
            {img: '04.jpg', title: 'Цезарь маки хl', ingredients: 'Rice, smoked chicken breast, masago caviar, tomato, iceberg, Caesar dressing ...', price: '$3.33'}
        ]},
        {id: 5, img: '05.jpg', title: 'Pizza Plus Plus', tag: '50 min', rating: 4.5, price: 'From $9.99', category: 'Pizza', products: [
            {img: '01.jpg', title: 'Roll eel standard', ingredients: 'Rice, eel, unagi sauce, sesame, nori seaweed.', price: '$16.66'},
            {img: '02.jpg', title: 'California Salmon Standard', ingredients: 'Rice, salmon, avocado, cucumber, mayonnaise, masago caviar, nori seaweed.', price: '$6.66'},
            {img: '03.jpg', title: 'Okinawa standard', ingredients: 'Rice, boiled shrimp, cream cheese, salmon, fresh cucumber ...', price: '$7.77'},
            {img: '04.jpg', title: 'Цезарь маки хl', ingredients: 'Rice, smoked chicken breast, masago caviar, tomato, iceberg, Caesar dressing ...', price: '$3.33'},
            {img: '05.jpg', title: 'Yasai Maki standard 185 g', ingredients: 'Rice, fresh tomato, bell pepper, avocado, cucumber, iceberg', price: '$8.88'},
            {img: '06.jpg', title: 'Shrimp Roll Standard', ingredients: 'Rice, nori seaweed, boiled shrimp, cream cheese, cucumbers', price: '$4.44'}
        ]},
        {id: 6, img: '06.jpg', title: 'Pizza Minus Minus', tag: '150 min', rating: 4.1, price: 'From $4.99', category: 'Pizza'}
    ];
    let cart = [
        {id: 1, name: 'God Pizza', price: '$43.00', count: 4},
        {id: 2, name: 'The best sushi', price: '$11.99', count: 3},
        {id: 3, name: 'All in one dishes', price: '$19.99', count: 2}
    ];
    let isRestaurant = window.location.pathname.includes('restaurant.html');

    if (isRestaurant) {
        let id = window.location.hash.replace(/[^0-9]/g, '');
        let restaurantNode = document.querySelector('#restaurant-info');
        let restaurantInfo = restaurants.find(function(obj) { return obj.id == id; });

        if (restaurantInfo) {
            populateData('#cards', '.card', restaurantInfo.products);
            fillNode(restaurantNode, restaurantInfo);
        }
    } else {
        populateData('#cards', '.card', restaurants);
    }
    
    populateData('#product-list', '.product-row', cart);


    const modal = document.querySelector('.modal');
    const cartButton = document.querySelector('#cart');
    const closeButton = document.querySelector('.close');
    cartButton.addEventListener('click', toggleModal(modal));
    closeButton.addEventListener('click', toggleModal(modal));

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
        login(usernameText.value);
        toggleModal(modalAuth)();
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
        if (data.img) {
            node.innerHTML = node.innerHTML.replace('00.jpg', data.img);
        }

        Object.keys(data).forEach(function(key) {
            let value = data[key];
            node.innerHTML = node.innerHTML.replace('{{' + key + '}}', value);
        });

        return node;
    }
}());