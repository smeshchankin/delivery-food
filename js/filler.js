'use strict';

window.app = window.app || {};
window.app.filler = (function() {
    let module = {
        populateData: populateData,
        fillNode: fillNode
    };

    function populateData(parentNode, templateNode, data, formatFunction) {
        parentNode.textContent = '';

        if (data) {
            for (let i = 0; i < data.length; i++) {
                let node = templateNode.cloneNode(true);
                parentNode.appendChild(fillNode(node, data[i], formatFunction));
            }
        }
    }

    function fillNode(node, data, formatFunction) {
        let obj = Object.assign({}, data);
        if (formatFunction) {
            obj = formatFunction(obj);
        }
        if (node.href && obj.id) {
            node.href = node.href.replace('{{id}}', obj.id);
        }
        if (node.id && obj.id) {
            node.id = node.id.replace('{{id}}', obj.id);
        }
        if (obj.image) {
            node.innerHTML = node.innerHTML.replace('img/dummy.jpg', obj.image);
        }

        Object.keys(obj).forEach(function(key) {
            let value = obj[key];
            node.innerHTML = node.innerHTML.replace('{{' + key + '}}', value);
        });

        return node;
    }

    return module;
}());
