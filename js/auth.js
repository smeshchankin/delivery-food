'use strict';

window.app = window.app || {};
window.app.auth = (function() {
    let dialog = window.app.dialog;

    let module = {
        init: init
    };

    let elems = {
        username: document.querySelector('.user-name'),
        button: {
            login: document.querySelector('#loginButton'),
            logout: document.querySelector('#logouButton')
        },
        modal: {
            id: document.querySelector('.modal-auth'),
            close: document.querySelector('.close-auth')
        },
        form: {
            id: document.querySelector('#logInForm'),
            username: document.querySelector('#login')
        }
    }

    function init() {
        elems.button.login.addEventListener('click', toggle);
        elems.modal.close.addEventListener('click', toggle);

        elems.form.id.addEventListener('submit', submitHandler);
        elems.button.logout.addEventListener('click', logoutHandler);

        let savedUsername = localStorage.getItem('delivery-food.username') || '';
        login(savedUsername);
    }

    function toggle() {
        return dialog.toggle(elems.modal.id);
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
