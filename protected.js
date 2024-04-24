document.addEventListener('DOMContentLoaded', function() {
    checkAuthentication();
    fetchProtectedData();
});

function checkAuthentication() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'index.html'; // Omdirigera till inloggningssidan om ingen token finns
    }
}

function fetchProtectedData() {
    const token = localStorage.getItem('token');
    fetch('http://localhost:3001/api/protected', {
    headers: {
        'Authorization': `Bearer ${token}`
    }
    })
    .then(response => {
        if (!response.ok) {
            if (response.status === 401) {
                // Token är ogiltig eller har gått ut
                alert('Sessionen har gått ut. Vänligen logga in igen.');
                localStorage.removeItem('token'); // Rensa token
                window.location.href = 'index.html'; // Omdirigera till inloggningssidan
            }
            throw new Error('Kunde inte hämta skyddad data.');
        }
        return response.json();
    })
    .then(data => {
        console.log('Skyddad data mottagen:', data); // Hantera mottagen data
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function logout() {
    localStorage.removeItem('token'); // Rensa token
    window.location.href = 'index.html'; // Omdirigera till inloggningssidan
}

// testar slå samman




document.getElementById('logoutButton').addEventListener('click', logout);
