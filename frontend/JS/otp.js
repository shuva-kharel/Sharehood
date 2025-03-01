// script.js
const otpInputs = document.querySelectorAll('.otp-input');

// Function to handle OTP input
otpInputs.forEach((input, index) => {
  input.addEventListener('input', (e) => {
    const value = e.target.value;

    // Allow only numbers
    if (!/^\d*$/.test(value)) {
      e.target.value = ''; // Clear non-numeric input
      return;
    }

    // Auto-focus to next input when a number is entered
    if (value.length === 1 && index < otpInputs.length - 1) {
      otpInputs[index + 1].focus();
    }
  });

  // Handle backspace key
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace' && index > 0 && !e.target.value) {
      otpInputs[index - 1].focus(); // Move to previous input on backspace
    }
  });
});

// Resend OTP Link
const resendOtpLink = document.getElementById('resend-otp-link');
resendOtpLink.addEventListener('click', (e) => {
  e.preventDefault(); // Prevent default link behavior
  console.log('Resending OTP...');
  alert('OTP has been resent!');
});