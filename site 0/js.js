function checkInput() {
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    const loginButton = document.getElementById('loginButton');
    if (login && password) {
        loginButton.disabled = false;
        loginButton.classList.add('enabled');
    } else {
        loginButton.disabled = true;
        loginButton.classList.remove('enabled');
    }
}

document.getElementById('loginButton').addEventListener('click', function() {
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    const loginError = document.getElementById('login-error');
    const passwordError = document.getElementById('password-error');

    let isValid = true;

    if (login !== 'Egor') {
        loginError.textContent = 'Неправильный логин';
        loginError.style.visibility = 'visible';
        document.getElementById('login').classList.add('input-error');
        isValid = false;
    } else {
        loginError.style.visibility = 'hidden';
        document.getElementById('login').classList.remove('input-error');
    }

    if (password !== '1234') {
        passwordError.textContent = 'Неправильный пароль';
        passwordError.style.visibility = 'visible';
        document.getElementById('password').classList.add('input-error');
        isValid = false;
    } else {
        passwordError.style.visibility = 'hidden';
        document.getElementById('password').classList.remove('input-error');
    }

    if (isValid) {
        window.location.href = 'file:///Users/njohuh/Desktop/практика%201/site.html'; 
    }
});
