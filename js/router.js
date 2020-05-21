'use strict';

window.app = window.app || {};
window.app.router = (function() {
    let utils = window.app.utils;
    let url = window.app.url;

    let module = {
        init: init,
        go: go
    };

    let config = { views: [] };
    let components = [];

    // data & methods are used in eval function
    function init(configPath, data, methods) {
        utils.getData(configPath).then(function(result) {
            config = result;
            config.views.forEach(function(view) {
                view.url = url.compile(view.path);
                view.data = eval(view.data);
                if (view.condition) {
                    view.condition.check = eval(view.condition.check);
                    view.condition.failed = eval(view.condition.failed);
                }
            });

            // Collect only unique components
            components = config.views.flatMap(view => view.components)
                .filter((value, index, array) => array.indexOf(value) === index);
        }).then(function() {
            window.addEventListener('hashchange', route);
            route();
        });
    }

    function go(viewName, params) {
        let view = findViewByName(viewName);
        let path = view.url.compile(params);
        goByPath(path);
    }

    function goByPath(path) {
        window.location.hash = path || '';
    }

    function route() {
        let path = decodeURI(window.location.hash).replace('#', '');
        let view = findViewByPath(path);
        if (view.condition && !view.condition.check(path))  {
            if (view.condition.failed) {
                view.condition.failed(path);
            }
            return;
        }
        let params = view.url.values(path);
        renderView(view.components, view.data(params));
    }

    function findViewByName(name) {
        return findView('name', name, function(view, value) {
            return view.name === value;
        });
    }

    function findViewByPath(path) {
        return findView('path', path, function(view, value) {
            return view.url.test(value);
        });
    }

    function findView(name, value, condition) {
        for (let idx = 0; idx < config.views.length; idx++) {
            const view = config.views[idx];
            if (condition(view, value)) {
                return view;
            }
        }

        throw new Error('Can\'t find router.view by ' + name + '=' + value);
    }

    function renderView(activeComponents, data) {
        const inactiveComponents = components.filter(componentName => !activeComponents.includes(componentName));
        inactiveComponents.forEach(componentName => {
            let component = window.app.component[componentName];
            component.hide();
            component.destroy();
        });

        let idx = 0;
        activeComponents.forEach(componentName => {
            let componentData = idx < data.length ? data[idx++] : {};

            let component = window.app.component[componentName];
            component.init(componentData);
            component.show();
        });

        window.scrollTo(0, 0);
    }

    return module;
}());
