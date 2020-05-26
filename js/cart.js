'use strict';

window.app = window.app || {};
window.app.cart = (function() {
    let filler = window.app.filler;
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
            template: '#product-list > .product-row',
            total: '.price-tag',
            close: '.close'
        }
    }
    elems = utils.applySelector(elems);

    let list = []; // {id: 'identificator', name: 'Product name', price: 10, count: 1}
    let user = auth.getUser;

    function init() {
        render();
        elems.button.addEventListener('click', toggle);
        elems.modal.close.addEventListener('click', toggle);
    }

    function add(id, added) {
        let count = added || 1;
        let row = list.find(row => row.id === id);
        if (row) {
            row.count += count;
        } else {
            const product = db.getStorageJoinRecord('providers', 'id', id);
            if (product) {
                row = {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    count: count
                };
                list.push(row);
            }
        }

        if (row.count <= 0) {
            list = list.filter(product => product.id !== id);
        }

        storage.cart.update(user(), list);

        render();
    }

    function remove(id) {
        list = list.filter(product => product.id !== id);
        storage.cart.update(user(), list);
        render();
    }

    function clear() {
        list = [];
        storage.cart.delete(user());
        render();
    }

    function render() {
        if (auth.isAuthorized()) {
            elems.button.classList.remove('hide');
        } else {
            elems.button.classList.add('hide');
        }
        list = storage.cart.get(user());
        filler.populate(elems.modal.template, list);
        const total = list.reduce((sum, row) => sum + row.price * row.count, 0);
        filler.populate(elems.modal.total, { total: total });
    }

    function toggle() {
        return dialog.toggle(elems.modal.id)();
    }

    return module;
}());
