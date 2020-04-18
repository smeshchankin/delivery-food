(function() {
    let restaurants = [
        {img: '01.jpg', title: 'Pizza Plus Plus', tag: '50 min', rating: 4.5, price: 'From $9.99', category: 'Pizza'},
        {img: '02.jpg', title: 'Pizza Minus Minus', tag: '150 min', rating: 4.1, price: 'From $4.99', category: 'Pizza, Rolls, Sushi'},
        {img: '03.jpg', title: 'Pizza Plus Plus', tag: '50 min', rating: 4.5, price: 'From $9.99', category: 'Pizza'},
        {img: '04.jpg', title: 'Pizza Minus Minus', tag: '150 min', rating: 4.1, price: 'From $4.99', category: 'Pizza'},
        {img: '05.jpg', title: 'Pizza Plus Plus', tag: '50 min', rating: 4.5, price: 'From $9.99', category: 'Pizza'},
        {img: '06.jpg', title: 'Pizza Minus Minus', tag: '150 min', rating: 4.1, price: 'From $4.99', category: 'Pizza'}
    ];
    let cart = [
        {name: 'God Pizza', price: '$43.00', count: 4},
        {name: 'The best sushi', price: '$11.99', count: 3},
        {name: 'All in one dishes', price: '$19.99', count: 2}
    ];

    populateData('#cards', '.card', restaurants);
    populateData('#product-list', '.product-row', cart);


    const modal = document.querySelector('.modal');
    const cartButton = document.querySelector('#cart');
    const closeButton = document.querySelector('.close');
    cartButton.addEventListener('click', toggleModal);
    closeButton.addEventListener('click', toggleModal);

    function toggleModal() {
        modal.classList.toggle('is-open');
    }

    function populateData(parentSelector, templateSelector, data) {
        let parentNode = document.querySelector(parentSelector);
        let templateNode = parentNode.querySelector(templateSelector);
        parentNode.removeChild(templateNode);

        for (let i = 0; i < data.length; i++) {
            parentNode.appendChild(fillNode(templateNode, data[i]));
        }
    }

    function fillNode(templateNode, data) {
        let node = templateNode.cloneNode(true);
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