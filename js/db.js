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
        getStorageJoinRecord: getStorageJoinRecord,
        searchProducts: searchProducts,
        productById: productById
    };

    async function init() {
        const config = await utils.getData('config/db.json');
        const promises = config.map(async function(record) {
            return utils.getData('db/' + record.path).then(function(data) {
                storage[record.name] = data;
                if (record.join) {
                    return data.map(async function(dataRow) {
                        dataRow[record.join] =
                            await utils.getData('db/' + dataRow[record.join]);
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

    function getStorageJoinRecord(name, join, key, value) {
        return getStorage(name).map(res => res[join]).flat()
            .find(p => p[key] == value) || null;
    }

    function searchJoinRecords(text, name, join, filter) {
        if (!text) {
            return [];
        }

        return getStorage(name).map(res => res[join]).flat()
            .filter(p => filter(p, text));
    }

    function searchProducts(str) {
        return searchJoinRecords(str.toLowerCase().trim(), 'providers', 'products',
            function(obj, text) {
                return obj.name.toLowerCase().includes(text)
            });
    }

    function productById(id) {
        return getStorageJoinRecord('providers', 'products', 'id', id);
    }

    return module;
}());
