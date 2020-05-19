'use strict';

window.app = window.app || {};
window.app.router = (function() {
    let utils = window.app.utils;
    let url = window.app.url;

    let db = window.app.db;
    let auth = window.app.auth;
    let search = window.app.search;

    let module = {
        init: init,
        go: go
    };

    let data = {
        search: function(path) {
            let data = search.getResult();
            return [data.products, data];
        },
        products: function(path) {
            let data = db.getRestaurant(path);
            return [data.products, data];
        },
        providers: function(path) {
            return [db.getRestaurants()];
        }
    };

    let methods = {
        isAuthorized: auth.isAuthorized,
        unauthorizedHandler: function(path) {
            window.location.hash = '';
            auth.toggle(path);
        }
    };

    let config = [];
    let components = [];

    utils.getData('config/router.json').then(function(result) {
        config = result;
        config.forEach(function(view) {
            view.data = eval(view.data);
            if (view.condition) {
                view.condition.check = eval(view.condition.check);
                view.condition.failed = eval(view.condition.failed);
            }
        });

        // Collect only unique components
        components = config.flatMap(view => view.components)
            .filter((value, index, array) => array.indexOf(value) === index);
    });

    function init() {
        window.addEventListener('hashchange', route);
        route();
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
        let viewId = path === 'search' ? 0 : path ? 1 : 2;
        return config[viewId];
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
