document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const registerError = document.getElementById('register-error');

    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const nama = document.getElementById('nama').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const telepon = document.getElementById('telepon').value;

        try {
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nama, email, password, telepon })
            });

            const data = await response.json();
            if (response.ok) {
                window.location.href = '../login/login.html'; // Redirect to login page
            } else {
                registerError.textContent = data.error || 'Registration failed.';
            }
        } catch (error) {
            console.error('Error:', error);
            registerError.textContent = 'An error occurred.';
        }
    });
});
