'use strict';

window.app = window.app || {};
window.app.url = (function() {
    let module = {
        compile: compile
    };

    function compile(pattern) {
        return new UrlRegExp(pattern);
    }

    function UrlRegExp(pattern) {
        let construct = constructor(pattern);
        this.pattern = pattern;
        this.vars = construct.vars;
        this.reg = construct.reg;

        function constructor(pattern) {
            let v = vars(pattern);
            let reg = v.reduce(function(result, item) {
                return result.replace('{' + item + '}', '(.+)');
            }, pattern);

            return {
                vars: v,
                reg: new RegExp('^' + reg + '$')
            };
        }

        function vars(str) {
            let reg = /\s*(\{[^{}]+\})\s*/g;
            return str.split(reg)
                .filter(elem => elem.charAt(0) === '{' && elem.slice(-1) === '}')
                .map(elem => elem.substring(1, elem.length - 1).trim());
        }
    }

    UrlRegExp.prototype.test = function(str) {
        return this.reg.test(str);
    };

    UrlRegExp.prototype.values = function(str) {
        let result = {};
        let vals = this.reg.exec(str) || [];
        for (let i = 0; i < this.vars.length; i++) {
            result[this.vars[i]] = vals[i + 1] || '';
        }

        return result;
    };

    UrlRegExp.prototype.compile = function(params) {
        return Object.keys(params).reduce(function(path, key) {
            return path.split('{' + key + '}').join(encodeURI(params[key]));
        }, this.pattern);
    };

    return module;
}());
