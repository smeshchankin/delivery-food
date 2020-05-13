'use strict';

window.app = window.app || {};
window.app.cart = (function() {
    let filler = window.app.filler;
    let dialog = window.app.dialog;
    let utils = window.app.utils;
    let db = window.app.db;

    let module = {
        init: init,
        add: add
    };

    let elems = {
        button: '#cart',
        modal: {
            id: '.modal',
            list: '#product-list',
            template: '#product-list > .product-row',
            total: '.price-tag',
            close: '.close'
        }
    }
    elems = utils.applySelector(elems);

    let data = [];

    function init() {
        // let data = [
        //     {id: 1, name: 'God Pizza', price: '$43.00', count: 4},
        //     {id: 2, name: 'The best sushi', price: '$11.99', count: 3},
        //     {id: 3, name: 'All in one dishes', price: '$19.99', count: 2}
        // ];
        render();
        elems.button.addEventListener('click', toggle);
        elems.modal.close.addEventListener('click', toggle);
    }

    function add(id) {
        let row = data.find(row => row.id === id);
        if (row) {
            row.count++;
        } else {
            const product = db.productById(id);
            if (product) {
                row = {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    count: 1
                };
                data.push(row);
            }
        }

        render();
    }

    function render() {
        filler.populateData(elems.modal.list, elems.modal.template, data);
        const total = data.reduce((sum, row) => sum + row.price * row.count, 0);
        elems.modal.total.textContent = '$' + total + '.00';
    }

    function toggle() {
        return dialog.toggle(elems.modal.id)();
    }

    return module;
}());
