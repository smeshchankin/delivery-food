'use strict';

window.app = window.app || {};
window.app.router = (function() {
    let db = window.app.db;
    let auth = window.app.auth;
    let search = window.app.search;

    let module = {
        init: init,
        go: go
    };

    let config = [
        {
            path: 'search',
            components: ['products', 'productsHeader']
        },
        {
            path: '{id}',
            components: ['products', 'productsHeader']
        },
        {
            path: '',
            components: ['providers', 'providersHeader']
        }
    ];
    // Collect only unique components
    let components = config.flatMap(view => view.components)
        .filter((value, index, array) => array.indexOf(value) === index);

    function init() {
        window.addEventListener('hashchange', route);
        route();
    }

    function go(path) {
        window.location.hash = path || '';
        route();
    }

    function route() {
        let id = window.location.hash.replace('#', '');
        if (id) {
            if (auth.isAuthorized()) {
                let data = id === 'search' ? search.getResult() : db.getRestaurant(id);
                let view = config[id === 'search' ? 0 : 1];
                renderView(view, [data.products, data]);
            } else {
                window.location.hash = '';
                auth.toggle(id);
            }
        } else {
            let data = db.getRestaurants();
            let view = config[2];
            renderView(view, [data]);
        }
    }

    function renderView(view, data) {
        const inactiveComponents = components.filter(componentName => !view.components.includes(componentName));
        inactiveComponents.forEach(componentName => {
            let component = window.app.component[componentName];
            component.hide();
            component.destroy();
        });

        let idx = 0;
        view.components.forEach(componentName => {
            let componentData = idx < data.length ? data[idx++] : {};

            let component = window.app.component[componentName];
            component.init(componentData);
            component.show();
        });

        window.scrollTo(0, 0);
    }

    return module;
}());
