'use strict';

window.app = window.app || {};
window.app.component = window.app.component || {};
window.app.component.page404 = (function() {
    let utils = window.app.utils;

    let module = {
        init: init,
        destroy: destroy,
        show: show,
        hide: hide
    };

    let template = '#page404';
    template = utils.applySelector(template);

    function init() {
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
