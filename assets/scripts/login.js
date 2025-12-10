// ----------------------
// Navigation Functions
// ----------------------
function goToSignup() {
  window.location.href = "sign_up.html";
}

function guestLogin() {
  window.location.href = "summary.html";
}

// ----------------------
// Password Icon Paths
// ----------------------
const lockIconPath = './assets/img/lock_icon.svg';
const noVisibilityIconPath = './assets/img/visibility_off.svg';
const visibilityIconPath = './assets/img/visibility.svg';

// ----------------------
// Generic Password Toggle Function
// ----------------------
/**
 * Toggle password visibility for input fields
 * @param {string} passwordId - ID of the password input
 * @param {string} toggleIconId - ID of the icon that toggles visibility
 */
function setupPasswordToggle(passwordId, toggleIconId) {
  const passwordInput = document.getElementById(passwordId);
  const toggleIcon = document.getElementById(toggleIconId);

  if (!passwordInput || !toggleIcon) return;

  let hasTyped = false;

  function toggleVisibility() {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      toggleIcon.src = visibilityIconPath;
    } else {
      passwordInput.type = 'password';
      toggleIcon.src = noVisibilityIconPath;
    }
  }

  passwordInput.addEventListener('input', () => {
    if (passwordInput.value.length > 0) {
      if (!hasTyped) {
        hasTyped = true;
        toggleIcon.src = noVisibilityIconPath;
        passwordInput.type = 'password';
      }
    } else {
      hasTyped = false;
      toggleIcon.src = lockIconPath;
      passwordInput.type = 'password';
    }
    updateSignupButtonState(); // Έλεγχος για κουμπί
  });

  toggleIcon.addEventListener('click', (event) => {
    event.preventDefault();
    if (passwordInput.value.length > 0) {
      toggleVisibility();
    }
  });
}

// Initialize password toggles
setupPasswordToggle('auth_password_input', 'toggle_password_icon');
setupPasswordToggle('auth_confirm_password_input', 'toggle_confirm_password_icon');

// ----------------------
// Elements
// ----------------------
const checkbox = document.querySelector('.checkbox-row input[type="checkbox"]');
const signupBtn = document.getElementById('signup_btn');

const nameInput = document.getElementById('auth_input_name');
const emailInput = document.getElementById('auth_input_mail');
const passwordInput = document.getElementById('auth_password_input');
const confirmPasswordInput = document.getElementById('auth_confirm_password_input');
const confirmPasswordError = document.getElementById('confirm_password_error');

// ----------------------
// Password Match Validation
// ----------------------
let confirmPasswordTouched = false;

if (passwordInput && confirmPasswordInput && confirmPasswordError) {
  confirmPasswordInput.addEventListener('input', () => {
    confirmPasswordTouched = true;
    confirmPasswordInput.classList.remove('error');
    confirmPasswordError.style.display = 'none';
    updateSignupButtonState();
  });

  confirmPasswordInput.addEventListener('blur', () => {
    if (confirmPasswordTouched) checkPasswordsMatch();
  });

  passwordInput.addEventListener('input', () => {
    if (confirmPasswordTouched) checkPasswordsMatch();
  });

  function checkPasswordsMatch() {
    if (confirmPasswordInput.value.length === 0) {
      confirmPasswordInput.classList.remove('error');
      confirmPasswordError.style.display = 'none';
      updateSignupButtonState();
      return;
    }

    if (passwordInput.value !== confirmPasswordInput.value) {
      confirmPasswordInput.classList.add('error');
      confirmPasswordError.style.display = 'block';
      confirmPasswordError.textContent = "Your passwords don't match. Please try again.";
    } else {
      confirmPasswordInput.classList.remove('error');
      confirmPasswordError.style.display = 'none';
    }
    updateSignupButtonState();
  }
}

// ----------------------
// Checkbox listener
// ----------------------
if (checkbox) {
  checkbox.addEventListener('change', updateSignupButtonState);
}

// ----------------------
// Enable/Disable Sign Up Button
// ----------------------
function updateSignupButtonState() {
  const isNameValid = nameInput && nameInput.value.trim() !== '';
  const isEmailValid = emailInput && emailInput.validity.valid;
  const isPasswordMatch = passwordInput && confirmPasswordInput &&
                          passwordInput.value === confirmPasswordInput.value &&
                          passwordInput.value.length > 0;
  const isCheckboxChecked = checkbox && checkbox.checked;

  const allValid = isNameValid && isEmailValid && isPasswordMatch && isCheckboxChecked;

  if (signupBtn) {
    signupBtn.disabled = !allValid;
    if (allValid) {
      signupBtn.style.backgroundColor = '#2a3647';
      signupBtn.style.color = 'white';
    } else {
      signupBtn.style.backgroundColor = '#999';
      signupBtn.style.color = '#eee';
    }
  }
}

// ----------------------
// Initialize state on load
// ----------------------
updateSignupButtonState();
