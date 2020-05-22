'use strict';

window.app = window.app || {};
window.app.dialog = (function() {
    let module = {
        open: open,
        toggle: toggle
    };

    function open(elem) {
        return function() {
            elem.classList.add("is-open");
        }
    }

    function toggle(elem) {
        return function() {
            elem.classList.toggle("is-open");
        }
    }

    return module;
}());
