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
        getStorageConnectionRecord: getStorageConnectionRecord,
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
                        dataRow[record.connection] =
                            await utils.getData('db/' + dataRow[record.connection]);
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

    function getStorageConnectionRecord(name, connection, key, value) {
        return getStorage(name).map(res => res[connection]).flat()
            .find(p => p[key] == value) || null;
    }

    function searchConnectionRecords(text, name, connection, filter) {
        if (!text) {
            return [];
        }

        return getStorage(name).map(res => res[connection]).flat()
            .filter(p => filter(p, text));
    }

    function searchProducts(str) {
        return searchConnectionRecords(str.toLowerCase().trim(), 'providers', 'products',
            function(obj, text) {
                return obj.name.toLowerCase().includes(text)
            });
    }

    function productById(id) {
        return getStorageConnectionRecord('providers', 'products', 'id', id);
    }

    return module;
}());
