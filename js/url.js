'use strict';

window.app = window.app || {};
window.app.url = (function() {
    let module = {
        vars: vars
    };

    function vars(str) {
        let reg = /\s*(\{[^{}]+\})\s*/g;
        return str.split(reg)
            .filter(elem => elem.charAt(0) === '{' && elem.slice(-1) === '}')
            .map(elem => elem.substring(1, elem.length - 1).trim());
    }

    function compile(pattern) {
        let v = vars(pattern);
        let reg = v.reduce(function(result, item) {
            return result.replace('{' + item + '}', '(.*)');
        }, pattern);

        return {
            vars: v,
            reg: new RegExp('^' + reg + '$')
        };
    }

    function test(compiledUrl, str) {
        return compiledUrl.reg.test(str);
    }

    function values(compiledUrl, str) {
        let result = {};
        let vals = compiledUrl.reg.exec(str);
        for (let i = 0; i < compiledUrl.vars.length; i++) {
            result[compiledUrl.vars[i]] = vals[i + 1];
        }

        return result;
    }

    function testCase() {
        let pattern = '/users/{user_id}_{user_login}/orders/{order_id}/getAll';
        let str = '/users/123_sergey/orders/orde/r#5/getAll'

        let urlRegExp = compile(pattern);
        console.log('test: ', test(urlRegExp, str));
        console.dir(values(urlRegExp, str));
    }

    testCase();

    return module;
}());
