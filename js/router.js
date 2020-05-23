'use strict';

window.app = window.app || {};
window.app.router = (function() {
    let builder = window.app.component.builder;
    let utils = window.app.utils;
    let url = window.app.url;

    let module = {
        init: init,
        go: go,
        goByPath: goByPath
    };

    let config = { views: [] };
    let components = {};

    // data & methods are used in eval function
    function init(configPath, data, methods) {
        utils.getData(configPath).then(function(result) {
            config = result;

            if (config.components) {
                config.components = config.components.reduce(function(map, componentConfig) {
                    map[componentConfig.name] = builder.build(componentConfig);
                    return map;
                }, {});
            }

            config.views.forEach(function(view) {
                view.url = url.compile(view.path);

                let dataMap = {};
                for (let i = 0; i < view.components.length; i++) {
                    dataMap[view.components[i]] = view.data && view.data[i] ?
                        eval(view.data[i]) : function() { return {}; };
                }
                view.data = dataMap;

                if (view.condition) {
                    view.condition.check = eval(view.condition.check);
                    view.condition.failed = eval(view.condition.failed);
                }

                view.components = view.components.reduce(function(map, componentName) {
                    map[componentName] = window.app.component[componentName];
                    return map;
                }, {});
            });

            if (config.default) {
                if (typeof config.default === 'string') {
                    config.default = cloneView(findViewByName(config.default));
                    config.default.params = [];
                } else {
                    let params = config.default.params;
                    config.default = cloneView(findViewByName(config.default.view));
                    config.default.params = params;
                }
            }

            // Collect only unique components
            config.views.forEach(view => {
                Object.keys(view.components).forEach(key => {
                    components[key] = view.components[key];
                })
            });
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
        if (!path && config.default) {
            let view = config.default;
            path = view.url.compile(view.params);
        }
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
        let params = !path && view.params ? view.params : view.url.values(path);
        renderView(view.components, view.data, params);
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
        if (value) {
            for (let idx = 0; idx < config.views.length; idx++) {
                const view = config.views[idx];
                if (condition(view, value)) {
                    return view;
                }
            }
            throw new Error('Can\'t find router.view by ' + name + '=' + value);
        } else  if (config.default) {
            return config.default;
        } else {
            throw new Error('router has no default view');
        }
    }

    function cloneView(view) {
        if (!view) {
            throw new Error('Can\'t clone empty view');
        }

        let clone = JSON.parse(JSON.stringify(view));
        clone.url = view.url;
        if (view.condition) {
            clone.condition = view.condition;
        }
        clone.components = view.components;
        if (view.data) {
            clone.data = view.data;
        }
        return clone;
    }

    function renderView(activeComponents, data, params) {
        let activeComponentsNames = Object.keys(activeComponents);
        Object.keys(components)
            .filter(componentName => !activeComponentsNames.includes(componentName))
            .forEach(componentName => {
                let component = components[componentName];
                component.hide();
                component.destroy();
            });

        activeComponentsNames.forEach(componentName => {
            let componentData = data[componentName](params);
            let component = activeComponents[componentName];
            component.init(componentData);
            component.show();
        });

        window.scrollTo(0, 0);
    }

    return module;
}());
