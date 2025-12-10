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

  // Exit if elements are not found (prevents errors on other pages)
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

  // Update icon and state based on input
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
  });

  // Toggle visibility when icon is clicked
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
// Checkbox & Signup Button
// ----------------------
const checkbox = document.querySelector('.checkbox-row input[type="checkbox"]');
const signupBtn = document.getElementById('signup_btn');

if (checkbox && signupBtn) {
  // Enable/disable signup button based on checkbox state
  checkbox.addEventListener('change', () => {
    signupBtn.disabled = !checkbox.checked;

    if (checkbox.checked) {
      signupBtn.style.backgroundColor = '#2a3647';
      signupBtn.style.color = 'white';
    } else {
      signupBtn.style.backgroundColor = '#999';
      signupBtn.style.color = '#eee';
    }
  });

  // Initialize button state on page load
  signupBtn.disabled = !checkbox.checked;
  if (!checkbox.checked) {
    signupBtn.style.backgroundColor = '#999';
    signupBtn.style.color = '#eee';
  }
}

// ----------------------
// Password & Confirm Password Match Validation
// ----------------------
const passwordInput = document.getElementById('auth_password_input');
const confirmPasswordInput = document.getElementById('auth_confirm_password_input');
const confirmPasswordError = document.getElementById('confirm_password_error');

// Only execute this block if all elements exist (prevents errors on other pages)
if (passwordInput && confirmPasswordInput && confirmPasswordError) {
  let confirmPasswordTouched = false;

  // When typing in confirm password, hide error
  confirmPasswordInput.addEventListener('input', () => {
    confirmPasswordTouched = true;
    confirmPasswordInput.classList.remove('error');
    confirmPasswordError.style.display = 'none';
  });

  // Check passwords on blur (when user leaves the field)
  confirmPasswordInput.addEventListener('blur', () => {
    if (confirmPasswordTouched) {
      checkPasswordsMatch();
    }
  });

  // Also check passwords if main password changes
  passwordInput.addEventListener('input', () => {
    if (confirmPasswordTouched) {
      checkPasswordsMatch();
    }
  });

  // Function to check if passwords match
  function checkPasswordsMatch() {
    if (confirmPasswordInput.value.length === 0) {
      confirmPasswordInput.classList.remove('error');
      confirmPasswordError.style.display = 'none';
      signupBtn.disabled = !checkbox.checked;
      return;
    }

    if (passwordInput.value !== confirmPasswordInput.value) {
      confirmPasswordInput.classList.add('error');
      confirmPasswordError.style.display = 'block';
      confirmPasswordError.textContent = "Your passwords don't match. Please try again.";
      signupBtn.disabled = true;
    } else {
      confirmPasswordInput.classList.remove('error');
      confirmPasswordError.style.display = 'none';
      signupBtn.disabled = !checkbox.checked;
    }
  }
}
