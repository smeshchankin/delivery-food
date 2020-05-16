'use strict';

window.app = window.app || {};
window.app.filler = (function() {
    let module = {
        list: populateList,
        object: populateObject
    };

    function populateList(parentNode, templateNode, data, formatFunction) {
        parentNode.textContent = '';

        if (data) {
            for (let i = 0; i < data.length; i++) {
                let node = templateNode.cloneNode(true);
                parentNode.appendChild(fillNode(node, data[i], formatFunction));
            }
        }
    }

    function populateObject(templateNode, obj, formatFunction) {
        let next = removeComponents(templateNode);
        let parent = templateNode.parentElement;

        let component = templateNode.cloneNode(true);
        component.dataset.component = '';
        parent.insertBefore(component, next);

        return fillNode(component, obj, formatFunction);
    }

    function removeComponents(templateNode) {
        let parent = templateNode.parentElement;
        let next = templateNode.nextSibling;
        if (next && next.dataset && next.dataset.component !== undefined) {
            let prev = next;
            next = next.nextSibling;
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
        if (obj.image) {
            node.innerHTML = node.innerHTML.split('data-src').join('src');
        }

        Object.keys(obj).forEach(function(key) {
            let value = obj[key];
            node.innerHTML = fill(node.innerHTML, key, value);
        });

        return node;
    }

    function fill(str, search, replacement) {
        return str.split('{{' + search + '}}').join(replacement);
    }

    return module;
}());
