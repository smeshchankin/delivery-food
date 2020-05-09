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
        providers: '#providers'
    };
    elems = utils.applySelector(elems);

    function init(list) {
        filler.populateData('#providers', '.card', list);
    }

    function show() {
    }

    function hide() {
        elems.header.classList.add('hide');
        elems.providers.classList.add('hide');
    }

    return module;
}());
