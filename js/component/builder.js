'use strict';

window.app = window.app || {};
window.app.component = window.app.component || {};
window.app.component.builder = (function() {
    let utils = window.app.utils;

    let module = {
        build: build
    };

    function build(config) {
        return new Component(config);
    }

    function Component(config) {
        this.name = config.name;
        this.template = utils.applySelector(config.template);
        this.nodes = [];
    }

    Component.prototype.init = function(obj) {
    };

    Component.prototype.destroy = function() {
    };

    Component.prototype.show = function() {
        this.template.classList.remove('hide');
    };

    Component.prototype.hide = function() {
        this.template.classList.add('hide');
    };

    return module;
}());
