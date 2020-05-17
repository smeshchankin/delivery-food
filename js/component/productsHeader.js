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

    let template = '#restaurant-info';
    template = utils.applySelector(template);

    let nodes = [];

    function init(obj) {
        nodes.push(...filler.populate(template, obj, formatter.provider));
    }

    function destroy() {
        filler.delete(nodes);
        nodes.length = 0;
    }

    function show() {
    }

    function hide() {
    }

    return module;
}());
