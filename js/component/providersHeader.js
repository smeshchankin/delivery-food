'use strict';

window.app = window.app || {};
window.app.component = window.app.component || {};
window.app.component.providersHeader = (function() {
    let utils = window.app.utils;

    let module = {
        init: init,
        destroy: destroy,
        show: show,
        hide: hide
    };

    let elems = {
        template: '.restaurants-header'
    };
    elems = utils.applySelector(elems);

    let nodes = [];

    function init(list) {
    }

    function destroy() {
    }

    function show() {
        elems.template.classList.remove('hide');
    }

    function hide() {
        elems.template.classList.add('hide');
    }

    return module;
}());
