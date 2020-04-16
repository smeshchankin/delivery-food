(function() {
    let data = [
        {img: '01.jpg', title: 'Pizza Plus Plus', tag: '50 min', rating: 4.5, price: 'From $9.99', category: 'Pizza'},
        {img: '02.jpg', title: 'Pizza Minus Minus', tag: '150 min', rating: 4.1, price: 'From $4.99', category: 'Pizza'},
        {img: '03.jpg', title: 'Pizza Plus Plus', tag: '50 min', rating: 4.5, price: 'From $9.99', category: 'Pizza'},
        {img: '04.jpg', title: 'Pizza Minus Minus', tag: '150 min', rating: 4.1, price: 'From $4.99', category: 'Pizza'},
        {img: '05.jpg', title: 'Pizza Plus Plus', tag: '50 min', rating: 4.5, price: 'From $9.99', category: 'Pizza'},
        {img: '06.jpg', title: 'Pizza Minus Minus', tag: '150 min', rating: 4.1, price: 'From $4.99', category: 'Pizza'}

    ];

    let cards = document.querySelector('#cards');
    let card = cards.querySelector('.card');

    cards.removeChild(card);

    for (let i = 0; i < data.length; i++) {
        cards.appendChild(fillCard(card, data[i]));
    }

    function fillCard(template, data) {
        let node = template.cloneNode(true);
        node.innerHTML = node.innerHTML.replace('00.jpg', data.img);

        Object.keys(data).forEach(function(key) {
            let value = data[key];
            node.innerHTML = node.innerHTML.replace('{{' + key + '}}', value);
        });

        return node;
    }
}());