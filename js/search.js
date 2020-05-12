'use strict';

window.app = window.app || {};
window.app.search = (function() {
    const ENTER_KEY_CODE = 13;

    let db = window.app.db;
    let utils = window.app.utils;
    let router;

    let module = {
        init: init,
        getResult: getResult
    };

    let elems = {
        search: '.input-search'
    }
    elems = utils.applySelector(elems);

    let result = {
        id: 'search',
        name: 'Search result',
        tag: '',
        rating: '',
        price: '',
        category: '',
        image: 'img/dummy.jpg',
        products: []
    };

    function init() {
        router = window.app.router;
        elems.search.addEventListener('keydown', search);
    }

    function getResult() {
        return result;
    }

    function search(event) {
        if (event.keyCode === ENTER_KEY_CODE) {
            const target = event.target;
            const value = target.value;

            if (validSearch(target)) {
                target.value = '';
                result.name = 'Search result: ' + value;
                result.products = db.searchProducts(value);
                router.go('search');
            }
        }
    }

    function validSearch(target) {
        const value = target.value;
        const isValid = !!value && value.trim().length > 2;
        if (!isValid) {
            target.style.backgroundColor = 'red';
                setTimeout(function() {
                    target.style.backgroundColor = '';
                }, 2000);
        }

        return isValid;
    }

    return module;
}());
