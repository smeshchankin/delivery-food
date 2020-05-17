'use strict';

window.app = window.app || {};
window.app.view = window.app.view || {};
window.app.view.providers = (function() {
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
        header: '.restaurants-header',
        template: '#providers > .card'
    };
    elems = utils.applySelector(elems);

    let nodes = [];

    function init(list) {
        nodes = filler.populate(elems.template, list, formatter.provider);
    }

    function destroy() {
        filler.delete(nodes);
    }

    function show() {
        elems.header.classList.remove('hide');
    }

    function hide() {
        elems.header.classList.add('hide');
    }

    return module;
}());
