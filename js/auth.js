'use strict';

window.app = window.app || {};
window.app.auth = (function() {
    let dialog = window.app.dialog;
    let utils = window.app.utils;
    let storage = window.app.storage;

    let module = {
        init: init
    };

    let elems = {
        username: '.user-name',
        button: { login: '#loginButton', logout: '#logouButton' },
        modal: { id: '.modal-auth', close: '.close-auth' },
        form: { id: '#logInForm', username: '#login', password: '#password' }
    };
    elems = utils.applySelector(elems);

    function init() {
        elems.button.login.addEventListener('click', toggle);
        elems.modal.close.addEventListener('click', toggle);
        elems.modal.close.addEventListener('click', clearForm);

        elems.form.id.addEventListener('submit', submitHandler);
        elems.button.logout.addEventListener('click', logoutHandler);

        login(storage.user.get());
    }

    function toggle() {
        return dialog.toggle(elems.modal.id)();
    }

    function clearForm() {
        elems.form.username.value = '';
        elems.form.password.value = '';
        elems.form.username.style.borderColor = '';
    }

    function submitHandler(event) {
        event.preventDefault();
        if (login(elems.form.username.value)) {
            toggle();
            clearForm();
        } else {
            elems.form.username.style.borderColor = 'red';
        }
    }

    function logoutHandler() {
        login('');
    }

    function login(username) {
        let login = username.trim();
        elems.username.textContent = login;
        elems.button.login.style.display = login ? 'none' : '';
        elems.button.logout.style.display = login ? '' : 'none';
        elems.form.username.value = '';

        if (login) {
            storage.user.update(login);
        } else {
            storage.user.delete();
        }

        return login;
    }

    return module;
}());
