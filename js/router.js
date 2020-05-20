'use strict';

window.app = window.app || {};
window.app.router = (function() {
    let utils = window.app.utils;
    let url = window.app.url;

    let module = {
        init: init,
        go: go
    };

    let config = [];
    let components = [];

    // data & methods are used in eval function
    function init(configPath, data, methods) {
        utils.getData(configPath).then(function(result) {
            config = result;
            config.forEach(function(view) {
                view.url = url.compile(view.path);
                view.data = eval(view.data);
                if (view.condition) {
                    view.condition.check = eval(view.condition.check);
                    view.condition.failed = eval(view.condition.failed);
                }
            });

            // Collect only unique components
            components = config.flatMap(view => view.components)
                .filter((value, index, array) => array.indexOf(value) === index);
        }).then(function() {
            window.addEventListener('hashchange', route);
            route();
        });
    }

    function go(path) {
        window.location.hash = path || '';
        route();
    }

    function route() {
        let path = window.location.hash.replace('#', '');
        let view = findViewByPath(path);
        if (view.condition && !view.condition.check(path))  {
            if (view.condition.failed) {
                view.condition.failed(path);
            }
            return;
        }
        renderView(view.components, view.data(path));
    }

    function findViewByPath(path) {
        for (let idx = 0; idx < config.length; idx++) {
            const conf = config[idx];
            if (conf.url.test(path)) {
                return conf;
            }
        }

        throw new Error('Can\'t find router.view by path=' + path);
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
