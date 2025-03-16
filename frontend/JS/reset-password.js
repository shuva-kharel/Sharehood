document.addEventListener("DOMContentLoaded", () => {
  const resetPasswordForm = document.getElementById("reset-password-form");
  const newPasswordInput = document.getElementById("new-password");
  const confirmPasswordInput = document.getElementById("confirm-password");

  // Extract token from URL
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token"); // Get token from query parameter

  if (!token) {
    alert("Invalid or missing token!");
    window.location.href = "forgot-password.html"; // Redirect if no token
    return;
  }

  resetPasswordForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newPassword = newPasswordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    if (!newPassword || !confirmPassword) {
      alert("Please enter both fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, { // ✅ Send token in URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: newPassword }) // ✅ Send only password in body
      });

      const data = await response.json();
      if (response.ok) {
        alert("Password reset successful!");
        window.location.href = "login.html";
      } else {
        alert(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  });
});
