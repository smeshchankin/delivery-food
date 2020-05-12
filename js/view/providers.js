'use strict';

window.app = window.app || {};
window.app.view = window.app.view || {};
window.app.view.providers = (function() {
    let filler = window.app.filler;
    let utils = window.app.utils;

    let module = {
        init: init,
        show: show,
        hide: hide
    };

    let elems = {
        header: '.restaurants-header',
        list: '#providers',
        template: '#providers > .card'
    };
    elems = utils.applySelector(elems);

    function init(list) {
        filler.populateData(elems.list, elems.template, list);
    }

    function show() {
        elems.header.classList.remove('hide');
        elems.list.classList.remove('hide');
    }

    function hide() {
        elems.header.classList.add('hide');
        elems.list.classList.add('hide');
    }

    return module;
}());
