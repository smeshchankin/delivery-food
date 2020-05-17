'use strict';

window.app = window.app || {};
window.app.component = window.app.component || {};
window.app.component.productsHeader = (function() {
    let utils = window.app.utils;
    let filler = window.app.filler;
    let formatter = window.app.formatter;

    let module = {
        init: init,
        destroy: destroy,
        show: show,
        hide: hide
    };

    let elems = {
        template: '#restaurant-info'
    };
    elems = utils.applySelector(elems);

    let nodes = [];

    function init(obj) {
        nodes.push(...filler.populate(elems.template, obj, formatter.provider));
    }

    function destroy() {
        filler.delete(nodes);
    }

    function show() {
    }

    function hide() {
    }

    return module;
}());
