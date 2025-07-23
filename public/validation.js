const form = document.getElementById('form');
const email = document.getElementById('email-input');
const password = document.getElementById('password-input');
const repeatPassword = document.getElementById('repeat-password-input');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', function (e) {
  // Reset styles
  errorMessage.textContent = '';
  form.querySelectorAll('div').forEach(div => div.classList.remove('incorrect'));

  // Validate email
  if (!email.value) {
    e.preventDefault();
    errorMessage.textContent = "Email is required.";
    email.parentElement.classList.add('incorrect');
    return;
  }

  // Validate password match
  if (password.value !== repeatPassword.value) {
    e.preventDefault();
    errorMessage.textContent = "Passwords do not match.";
    password.parentElement.classList.add('incorrect');
    repeatPassword.parentElement.classList.add('incorrect');
    return;
  }

  // Password empty
  if (!password.value || !repeatPassword.value) {
    e.preventDefault();
    errorMessage.textContent = "Password fields cannot be empty.";
    return;
  }

  // Optional: Password length check
  if (password.value.length < 6) {
    e.preventDefault();
    errorMessage.textContent = "Password must be at least 6 characters long.";
    password.parentElement.classList.add('incorrect');
    return;
  }
});
