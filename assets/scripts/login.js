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


