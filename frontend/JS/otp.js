document.addEventListener('DOMContentLoaded', () => {
  const otpInputs = document.querySelectorAll('.otp-input');
  const verifyButton = document.getElementById('verify-otp');
  const resendOtpLink = document.getElementById('resend-otp-link');
  const messageBox = document.createElement('p'); // Create a message element
  messageBox.style.color = 'green';
  messageBox.style.fontWeight = 'bold';
  messageBox.style.textAlign = 'center';
  messageBox.style.marginTop = '10px';

  const formBox = document.querySelector('.form-box');
  formBox.appendChild(messageBox); // Append message below the OTP box

  if (otpInputs.length === 0) {
    console.error("OTP input fields not found!");
    return;
  }
  if (!verifyButton) {
    console.error("Verify OTP button not found!");
    return;
  }
  if (!resendOtpLink) {
    console.error("Resend OTP link not found!");
    return;
  }

  // Focus logic for OTP inputs
  otpInputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
      if (!/^\d*$/.test(e.target.value)) {
        e.target.value = '';
        return;
      }
      if (e.target.value.length === 1 && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && index > 0 && !e.target.value) {
        otpInputs[index - 1].focus();
      }
    });
  });

  // Handle OTP Verification
  verifyButton.addEventListener('click', async () => {
    const email = localStorage.getItem('email'); // Get stored email
    if (!email) {
      alert('Email not found, please register again.');
      window.location.href = '/frontend/HTML/login.html';
      return;
    }

    // Get OTP from input fields
    const otp = Array.from(otpInputs).map((input) => input.value).join('');

    if (otp.length !== 6) {
      alert('Please enter a valid 6-digit OTP');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: otp }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Invalid OTP. Please try again.');
      }

      const result = await response.json();

      localStorage.removeItem('email'); // Remove email from storage after verification

      // Show success message instead of redirecting immediately
      messageBox.textContent = '✅ OTP Verified Successfully! Redirecting to login...';

      // Redirect to login page after 2 seconds
      setTimeout(() => {
        window.location.href = '/frontend/HTML/login.html';
      }, 2000);

    } catch (error) {
      console.error('OTP Verification Error:', error);
      alert(error.message || 'OTP verification failed');
    }
  });

  // Handle OTP Resend
  resendOtpLink.addEventListener('click', async (e) => {
    e.preventDefault();

    const email = localStorage.getItem('email');
    if (!email) {
      alert('Email not found, please register again.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to resend OTP. Please try again.');
      }

      alert('New OTP has been sent to your email.');
    } catch (error) {
      console.error('Resend OTP Error:', error);
      alert(error.message || 'Failed to resend OTP');
    }
  });
});
