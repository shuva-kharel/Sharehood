document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    window.location.href = '/frontend/HTML/login.html';
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/auth/check', {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Unauthorized');
    }

    console.log('User is logged in');
  } catch (error) {
    console.error('Auth check failed:', error);
    localStorage.removeItem('token'); // Clear token if invalid
    window.location.href = '/frontend/HTML/login.html';
  }

  const logoutButton = document.getElementById('logoutButton');
  if (logoutButton) {
    logoutButton.addEventListener('click', async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/logout', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          credentials: 'include',
        });

        if (response.ok) {
          localStorage.removeItem('token'); // Remove token on logout
          window.location.href = '/frontend/HTML/login.html';
        } else {
          alert('Logout failed');
        }
      } catch (error) {
        console.error('Logout error:', error);
        alert('An error occurred during logout');
      }
    });
  }
});
