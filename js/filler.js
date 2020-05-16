'use strict';

window.app = window.app || {};
window.app.filler = (function() {
    let module = {
        populate: populate
    };

    function populate(templateNode, data, formatFunction) {
        if (data instanceof Array) {
            return populateList(templateNode, data, formatFunction);
        } else {
            return populateObject(templateNode, data, formatFunction);
        }
    }

    function populateList(templateNode, data, formatFunction) {
        let next = removeComponents(templateNode);
        let nodes = [];
        if (data) {
            let parent = templateNode.parentElement;
            for (let i = 0; i < data.length; i++) {
                let component = templateNode.cloneNode(true);
                component.dataset.component = '';
                component.classList.remove('hide');
                parent.insertBefore(component, next);
                fillNode(component, data[i], formatFunction);

                nodes.push(component);
            }
        }
        return nodes;
    }

    function populateObject(templateNode, obj, formatFunction) {
        let next = removeComponents(templateNode);
        let parent = templateNode.parentElement;

        let component = templateNode.cloneNode(true);
        component.dataset.component = '';
        component.classList.remove('hide');
        parent.insertBefore(component, next);
        fillNode(component, obj, formatFunction);

        return component;
    }

    function removeComponents(templateNode) {
        let parent = templateNode.parentElement;
        let next = templateNode.nextElementSibling;
        while (next && next.dataset && next.dataset.component !== undefined) {
            let prev = next;
            next = next.nextElementSibling;
            parent.removeChild(prev);
        }
        return next;
    }

    function fillNode(node, data, formatFunction) {
        let obj = Object.assign({}, data);
        if (formatFunction) {
            obj = formatFunction(obj);
        }

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
