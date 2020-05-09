'use strict';

window.app = window.app || {};
window.app.cart = (function() {
    let dialog = window.app.dialog;
    let utils = window.app.utils;

    let module = {
        init: init
    };

    let elems = {
        button: '#cart',
        modal: {
            id: '.modal',
            close: '.close'
        }
    }
    elems = utils.applySelector(elems);

    function init() {
        let data = [
            {id: 1, name: 'God Pizza', price: '$43.00', count: 4},
            {id: 2, name: 'The best sushi', price: '$11.99', count: 3},
            {id: 3, name: 'All in one dishes', price: '$19.99', count: 2}
        ];
        filler.populateData('#product-list', '.product-row', data);

        elems.button.addEventListener('click', toggle);
        elems.modal.close.addEventListener('click', toggle);
    }

    function toggle() {
        return dialog.toggle(elems.modal.id)();
    }

    return module;
}());
