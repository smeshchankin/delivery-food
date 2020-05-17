'use strict';

window.app = window.app || {};
window.app.utils = (function() {
    let module = {
        applyFunction: applyFunction,
        applySelector: applySelector
    };

    function applyFunction(obj, fun, context) {
        if (isPrimitive(obj)) {
            return fun.call(context, obj);
        }

        let res = {};
        Object.keys(obj).forEach(function(key) {
            res[key] = typeof obj[key] === 'object' ?
                applyFunction(obj[key], fun, context) :
                fun.call(context, obj[key]);
        });
        return res;
    }

    function applySelector(obj) {
        return applyFunction(obj, document.querySelector, document);
    }

    function isPrimitive(value) {
        let type = typeof value;
        return type !== 'object' && type !== 'function' || value === null;
    }

    return module;
}());
