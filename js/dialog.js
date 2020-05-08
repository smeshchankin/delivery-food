'use strict';

window.app = window.app || {};
window.app.dialog = (function() {
    let module = {
        toggle: toggle
    };

    function toggle(elem) {
        return function() {
            elem.classList.toggle("is-open");
        }
    }

    return module;
}());
