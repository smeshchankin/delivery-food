'use strict';

window.app = window.app || {};
window.app.filler = (function() {
    let module = {
        populateData: populateData,
        fillNode: fillNode
    };

    function populateData(parentNode, templateNode, data) {
        parentNode.textContent = '';

        if (data) {
            for (let i = 0; i < data.length; i++) {
                let node = templateNode.cloneNode(true);
                parentNode.appendChild(fillNode(node, data[i]));
            }
        }
    }

    function fillNode(node, data) {
        if (node.href && data.id) {
            node.href = node.href.replace('{{id}}', data.id);
        }
        if (node.id && data.id) {
            node.id = node.id.replace('{{id}}', data.id);
        }
        if (data.image) {
            node.innerHTML = node.innerHTML.replace('img/dummy.jpg', data.image);
        }

        Object.keys(data).forEach(function(key) {
            let value = data[key];
            node.innerHTML = node.innerHTML.replace('{{' + key + '}}', value);
        });

        return node;
    }

    return module;
}());
