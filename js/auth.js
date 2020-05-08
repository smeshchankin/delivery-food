'use strict';

window.app = window.app || {};
window.app.auth = (function() {
    let dialog = window.app.dialog;

    let module = {
        init: init
    };

    let modalAuth = document.querySelector('.modal-auth');
    let loginButton = document.querySelector('#loginButton');
    let closeAuthButton = document.querySelector('.close-auth');
    let signInForm = document.querySelector('#logInForm');
    let usernameLabel = document.querySelector('.user-name');
    let usernameText = document.querySelector('#login');
    let logoutButton = document.querySelector('#logouButton');

    function init() {
        loginButton.addEventListener('click', dialog.toggle(modalAuth));
        closeAuthButton.addEventListener('click', dialog.toggle(modalAuth));

        signInForm.addEventListener('submit', submitHandler);
        logoutButton.addEventListener('click', logoutHandler);

        let savedUsername = localStorage.getItem('delivery-food.username') || '';
        login(savedUsername);
    }

    function submitHandler(event) {
        event.preventDefault();
        if (login(usernameText.value)) {
            dialog.toggle(modalAuth)();
            usernameText.style.borderColor = '';
        } else {
            usernameText.style.borderColor = 'red';
        }
    }

    function logoutHandler() {
        login('');
    }

    function login(username) {
        let login = username.trim();
        if (login) {
            usernameLabel.textContent = login;
            loginButton.style.display = 'none';
            logoutButton.style.display = '';
        } else {
            usernameLabel.textContent = '';
            loginButton.style.display = '';
            logoutButton.style.display = 'none';
        }
        localStorage.setItem('delivery-food.username', login);

        usernameText.value = '';

        return login;
    }

    return module;
}());
