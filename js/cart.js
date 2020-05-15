'use strict';

window.app = window.app || {};
window.app.cart = (function() {
    let filler = window.app.filler;
    let formatter = window.app.formatter;
    let dialog = window.app.dialog;
    let utils = window.app.utils;
    let db = window.app.db;
    let auth = window.app.auth;
    let storage = window.app.storage;

    let module = {
        init: init,
        add: add,
        remove: remove,
        clear: clear,
        render: render
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

    let data = []; // {id: 'identificator', name: 'Product name', price: 10, count: 1}
    let user = auth.getUser;

    function init() {
        render();
        elems.button.addEventListener('click', toggle);
        elems.modal.close.addEventListener('click', toggle);
    }

    function add(id, added) {
        let count = added || 1;
        let row = data.find(row => row.id === id);
        if (row) {
            row.count += count;
        } else {
            const product = db.productById(id);
            if (product) {
                row = {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    count: count
                };
                data.push(row);
            }
        }

        if (row.count <= 0) {
            data = data.filter(product => product.id !== id);
        }

        storage.cart.update(user(), data);

        render();
    }

    function remove(id) {
        data = data.filter(product => product.id !== id);
        storage.cart.update(user(), data);
        render();
    }

    function clear() {
        data = [];
        storage.cart.delete(user());
        render();
    }

    function render() {
        if (auth.isAuthorized()) {
            elems.button.classList.remove('hide');
        } else {
            elems.button.classList.add('hide');
        }
        data = storage.cart.get(user());
        filler.list(elems.modal.list, elems.modal.template, data, formatter.product);
        const total = data.reduce((sum, row) => sum + row.price * row.count, 0);
        elems.modal.total.textContent = formatter.price(total);
    }

    function toggle() {
        return dialog.toggle(elems.modal.id)();
    }

    return module;
}());
