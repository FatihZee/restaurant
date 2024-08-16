document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token); // Save token to localStorage
                window.location.href = '../dashboard/index.html';
            } else {
                loginError.textContent = data.error || 'Login failed.';
            }
        } catch (error) {
            console.error('Error:', error);
            loginError.textContent = 'An error occurred.';
        }
    });
});
