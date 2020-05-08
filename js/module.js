'use strict';

window.app = window.app || {};
window.app.module = (function() {
    let module = {
        foo: foo,
        bar: bar
    };

    function foo() {
        return 'foo';
    }

    function bar(name) {
        console.log('Hello, ' + name + '!');
    }

    return module;
}());
