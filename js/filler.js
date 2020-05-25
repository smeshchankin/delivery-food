'use strict';

window.app = window.app || {};
window.app.filler = (function() {
    let module = {
        populate: populate,
        delete: remove
    };

    function populate(templateNode, data) {
        if (data instanceof Array) {
            return populateList(templateNode, data);
        } else {
            return populateList(templateNode, [data]);
        }
    }

    function remove(nodes) {
        nodes.forEach(function(node) {
            let parent = node.parentElement;
            if (parent) {
                parent.removeChild(node);
            }
        });
    }

    function populateList(templateNode, data) {
        let next = removeComponents(templateNode);
        let nodes = [];
        if (data) {
            let parent = templateNode.parentElement;
            for (let i = 0; i < data.length; i++) {
                let component = templateNode.cloneNode(true);
                component.dataset.component = '';
                component.classList.remove('hide');
                parent.insertBefore(component, next);
                fillNode(component, data[i]);

                nodes.push(component);
            }
        }
        return nodes;
    }

    function removeComponents(templateNode) {
        let list = [];
        let next = templateNode.nextElementSibling;
        while (next && next.dataset && next.dataset.component !== undefined) {
            list.push(next);
            next = next.nextElementSibling;
        }
        remove(list);

        return next;
    }

    function fillNode(node, data) {
        let obj = Object.assign({}, data);

        if (node.href && obj.id) {
            node.href = fill(node.href, 'id', obj.id);
        }
        if (node.id && obj.id) {
            node.id = fill(node.id, 'id', obj.id);
        }

        Object.keys(obj).forEach(function(key) {
            let value = obj[key];
            node.innerHTML = fill(node.innerHTML, key, value);
        });

        if (obj.image) {
            node.innerHTML = node.innerHTML.split('data-src').join('src');
        }

        return node;
    }

    function fill(str, search, replacement) {
        return str.split('{{' + search + '}}').join(replacement);
    }

    return module;
}());
