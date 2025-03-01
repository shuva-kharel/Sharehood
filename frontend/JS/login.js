document.addEventListener('DOMContentLoaded', () => {
  // Select elements
  const wrapper = document.querySelector('.wrapper');
  const registerLink = document.querySelector('.register-link');
  const loginLink = document.querySelector('.login-link');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  // Redirect to homepage if already logged in
  if (localStorage.getItem('token')) {
    window.location.href = '/frontend/HTML/homepage.html';
  }

  // Toggle between login and register forms
  registerLink.addEventListener('click', (e) => {
    e.preventDefault();
    wrapper.classList.add('active');
  });

  loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    wrapper.classList.remove('active');
  });

  // Handle Login Form Submission
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.message || 'Login failed');
      }

      const result = await response.json();
      localStorage.setItem('token', result.token); // Save token

      window.location.href = '/frontend/HTML/homepage.html';
    } catch (error) {
      console.error('Login error:', error);
      alert(error.message || 'Login failed');
    }
  });

  // Handle Register Form Submission
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(registerForm);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.message || 'Registration failed');
      }

      const result = await response.json();
      localStorage.setItem('token', result.token); // Save token

      window.location.href = '/frontend/HTML/homepage.html';
    } catch (error) {
      console.error('Registration error:', error);
      alert(error.message || 'Registration failed');
    }
  });
});
