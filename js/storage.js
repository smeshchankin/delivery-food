'use strict';

window.app = window.app || {};
window.app.storage = window.app.storage || {};
window.app.storage.user = (function() {
    const KEY = 'delivery-food.username';
    let module = {
        get: get,
        update: update,
        delete: remove
    };

    function get() {
        return localStorage.getItem(KEY) || '';
    }

    function update(user) {
        localStorage.setItem(KEY, user);
    }

    function remove() {
        localStorage.removeItem(KEY);
    }

    return module;
}());

window.app.storage.cart = (function() {
    const KEY = 'delivery-food.cart';
    let module = {
        get: get,
        update: update,
        delete: remove
    };

    function get(username) {
        return JSON.parse(localStorage.getItem(getKey(username)) || '[]');
    }

    function update(username, rows) {
        localStorage.setItem(getKey(username), JSON.stringify(rows));
    }

    function remove(username) {
        localStorage.removeItem(getKey(username));
    }

    function getKey(username) {
        return KEY + '.' + (username ? username : 'null');
    }

    return module;
}());
