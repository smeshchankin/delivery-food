'use strict';

window.app = window.app || {};
window.app.component = window.app.component || {};
window.app.component.builder = (function() {
    let utils = window.app.utils;
    let filler = window.app.filler;

    let module = {
        build: build
    };

    function build(config) {
        return new Component(config);
    }

    function Component(config) {
        this.name = config.name;
        this.template = utils.applySelector(config.template);
        this.nodes = null;
    }

    Component.prototype.init = function(obj) {
        if (obj) {
            this.nodes = filler.populate(this.template, obj);
        }
    };

    Component.prototype.destroy = function() {
        if (this.nodes) {
            filler.delete(this.nodes);
            this.nodes = [];
        }
    };

    Component.prototype.show = function() {
        if (!this.nodes) {
            this.template.classList.remove('hide');
        }
    };

    Component.prototype.hide = function() {
        if (!this.nodes) {
            this.template.classList.add('hide');
        }
    };

    return module;
}());
