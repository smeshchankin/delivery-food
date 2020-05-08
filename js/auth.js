'use strict';

window.app = window.app || {};
window.app.auth = (function() {
    let dialog = window.app.dialog;
    let utils = window.app.utils;

    let module = {
        init: init
    };

    let elems = {
        username: '.user-name',
        button: { login: '#loginButton', logout: '#logouButton' },
        modal: { id: '.modal-auth', close: '.close-auth' },
        form: { id: '#logInForm', username: '#login' }
    };
    elems = utils.applySelector(elems);

    function init() {
        elems.button.login.addEventListener('click', toggle);
        elems.modal.close.addEventListener('click', toggle);

        elems.form.id.addEventListener('submit', submitHandler);
        elems.button.logout.addEventListener('click', logoutHandler);

        let savedUsername = localStorage.getItem('delivery-food.username') || '';
        login(savedUsername);
    }

    function toggle() {
        return dialog.toggle(elems.modal.id)();
    }

    function submitHandler(event) {
        event.preventDefault();
        if (login(elems.form.username.value)) {
            toggle();
            elems.form.username.style.borderColor = '';
        } else {
            elems.form.username.style.borderColor = 'red';
        }
    }

    function logoutHandler() {
        login('');
    }

    function login(username) {
        let login = username.trim();
        if (login) {
            elems.username.textContent = login;
            elems.button.login.style.display = 'none';
            elems.button.logout.style.display = '';
        } else {
            elems.username.textContent = '';
            elems.button.login.style.display = '';
            elems.button.logout.style.display = 'none';
        }
        localStorage.setItem('delivery-food.username', login);

        elems.form.username.value = '';

        return login;
    }

    return module;
}());
