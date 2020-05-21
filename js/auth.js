'use strict';

window.app = window.app || {};
window.app.auth = (function() {
    let dialog = window.app.dialog;
    let utils = window.app.utils;
    let storage = window.app.storage;
    let router;

    let module = {
        init: init,
        toggle: toggle,
        isAuthorized: isAuthorized,
        getUser: getUser,
        addLoginListener: addLoginListener
    };

    let elems = {
        username: '.user-name',
        button: { login: '#loginButton', logout: '#logouButton' },
        modal: { id: '.modal-auth', close: '.close-auth' },
        form: { id: '#logInForm', username: '#login', password: '#password' }
    };
    elems = utils.applySelector(elems);

    let loginName = '';
    let redirect = '';
    let listeners = [];

    function init() {
        router = window.app.router;

        elems.button.login.addEventListener('click', toggle);
        elems.modal.close.addEventListener('click', toggle);
        elems.modal.close.addEventListener('click', clearForm);

        elems.form.id.addEventListener('submit', submitHandler);
        elems.button.logout.addEventListener('click', logoutHandler);

        login(storage.user.get());
    }

    function toggle(url) {
        redirect = typeof url === 'string' ? url || '' : '';
        return dialog.toggle(elems.modal.id)();
    }

    function isAuthorized() {
        return !!loginName;
    }

    function getUser() {
        return loginName;
    }

    function addLoginListener(fun) {
        listeners.push(fun);
    }

    function clearForm() {
        elems.form.username.value = '';
        elems.form.password.value = '';
        elems.form.username.style.borderColor = '';
    }

    function submitHandler(event) {
        event.preventDefault();
        if (login(elems.form.username.value)) {
            clearForm();
            router.goByPath(redirect);
            toggle();
        } else {
            elems.form.username.style.borderColor = 'red';
        }
    }

    function logoutHandler() {
        login('');
        router.goByPath();
    }

    function login(username) {
        loginName = username.trim();
        elems.username.textContent = loginName;
        elems.button.login.style.display = loginName ? 'none' : '';
        elems.button.logout.style.display = loginName ? '' : 'none';
        elems.form.username.value = '';

        if (loginName) {
            storage.user.update(loginName);
        } else {
            storage.user.delete();
        }

        listeners.forEach(f => f());

        return loginName;
    }

    return module;
}());
