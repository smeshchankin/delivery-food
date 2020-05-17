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

    let template = '.restaurants-header';
    template = utils.applySelector(template);

    let nodes = [];

    function init(list) {
    }

    function destroy() {
    }

    function show() {
        template.classList.remove('hide');
    }

    function hide() {
        template.classList.add('hide');
    }

    return module;
}());
