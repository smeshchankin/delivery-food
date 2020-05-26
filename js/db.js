'use strict';

window.app = window.app || {};
window.app.db = (function() {
    let utils = window.app.utils;

    const PATH = 'db/providers.json';
    let storage = {};

    let module = {
        init: init,
        getStorage: getStorage,
        getStorageRecord: getStorageRecord,
        searchProducts: searchProducts,
        productById: productById
    };

    async function init() {
        const config = await utils.getData('config/db.json');
        const promises = config.map(async function(record) {
            return utils.getData('db/' + record.path).then(function(data) {
                storage[record.name] = data;
                if (record.connection) {
                    return data.map(async function(dataRow) {
                        dataRow[record.connection] = await utils.getData('db/' + dataRow[record.connection]);
                    })
                }
            });
        });

        return Promise.all(promises);
    }

    function getStorage(name) {
        return storage[name];
    }

    function getStorageRecord(name, key, value) {
        return getStorage(name).find(function(obj) { return obj[key] == value; }) || null;
    }

    function searchProducts(str) {
        if (!str) {
            return [];
        }

        let text = str.toLowerCase().trim();
        return getStorage('providers').map(res => res.products).flat()
            .filter(p => p.name.toLowerCase().includes(text));
    }

    function productById(id) {
        return getStorage('providers').map(res => res.products).flat()
            .find(p => p.id === id) || null;
    }

    return module;
}());
