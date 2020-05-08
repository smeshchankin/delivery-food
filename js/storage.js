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
