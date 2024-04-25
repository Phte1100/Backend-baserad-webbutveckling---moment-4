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

function sanitizeData(data) {
    return data.map(item => ({
        ...item,
        username: item.username.replace(/(<([^>]+)>)/ig, ''), // Enkel sanering för att ta bort HTML-taggar
        password: item.password.replace(/(<([^>]+)>)/ig, '')
    }));
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
        const sanitizedData = sanitizeData(data);
        console.log('Skyddad och sanerad data mottagen:', sanitizedData);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function logout() {
    localStorage.removeItem('token'); // Rensa token
    const Feedback = document.getElementById('Feedback');
    Feedback.textContent = 'Du har loggats ut.';
    setTimeout(() => {
        window.location.href = 'index.html'; // Omdirigera till inloggningssidan
    }, 2000); // Vänta två sekunder innan omdirigering
}

document.getElementById('logoutButton').addEventListener('click', logout);
