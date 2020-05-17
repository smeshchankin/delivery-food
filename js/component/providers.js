'use strict';

window.app = window.app || {};
window.app.component = window.app.component || {};
window.app.component.providers = (function() {
    let utils = window.app.utils;
    let filler = window.app.filler;
    let formatter = window.app.formatter;

    let module = {
        init: init,
        destroy: destroy,
        show: show,
        hide: hide
    };

    let template = '#providers > .card';
    template = utils.applySelector(template);

    let nodes = [];

    function init(list) {
        nodes = filler.populate(template, list, formatter.provider);
    }

    function destroy() {
        filler.delete(nodes);
        nodes = [];
    }

    function show() {
    }

    function hide() {
    }

    return module;
}());
