'use strict';

window.app = window.app || {};
window.app.search = (function() {
    const ENTER_KEY_CODE = 13;

    let db = window.app.db;
    let utils = window.app.utils;
    let router;

    let module = {
        init: init,
        search: search,
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
        rating: '5.0',
        price: '',
        category: '',
        image: 'img/dummy.jpg',
        products: []
    };

    function init() {
        router = window.app.router;
        elems.search.addEventListener('keydown', searchHandler);
    }

    function search(value) {
        result.name = 'Search result: ' + value;
        result.products = db.searchProducts(value);
        result.price = result.products.length === 0 ? 0 :
            Math.min(...result.products.map(p => p.price));
    }

    function getResult() {
        return result;
    }

    function searchHandler(event) {
        if (event.keyCode === ENTER_KEY_CODE) {
            const target = event.target;
            const value = target.value;

            if (validSearch(target)) {
                target.value = '';
                router.go('/search/' + encodeURI(value));
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
