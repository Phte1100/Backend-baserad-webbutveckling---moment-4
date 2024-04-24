document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const formFeedback = document.getElementById('formFeedback');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            loginUser(username, password);        
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            registerUser(username, password);
        });
    }
});

function loginUser(username, password) {
    fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem('token', data.token);
            window.location.href = 'list.html'; // Anpassa till rätt sida
        } else {
            throw new Error(data.error || 'Inloggningen misslyckades');
        }
    })
    .catch(error => {
        console.error('Fel vid inloggning:', error.message);
        alert('Fel vid inloggning: ' + error.message);
    });
}

function registerUser(username, password) {
    fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        alert('Registreringen lyckades! Vänligen logga in.');
        window.location.href = 'index.html'; // Omdirigera till inloggningssidan
    })
    .catch(error => {
        console.error('Fel vid registrering:', error.message);
        alert('Fel vid registrering: ' + error.message);
    });
}
