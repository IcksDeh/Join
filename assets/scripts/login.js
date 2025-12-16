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
// Helper 1: Manages visibility toggling (Click Event)
// ----------------------
function toggleVisibilityState(passwordInput, toggleIcon) {
  // If the field is empty, do nothing
  if (passwordInput.value.length === 0) return;

  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggleIcon.src = visibilityIconPath;
  } else {
    passwordInput.type = 'password';
    toggleIcon.src = noVisibilityIconPath;
  }
}

// ----------------------
// Helper 2: Manages icon changes during typing (Input Event)
// ----------------------
function handlePasswordInput(passwordInput, toggleIcon) {
  if (passwordInput.value.length > 0) {
    // If the user starts typing and the icon is currently the 'lock', change it to the 'eye'
    // We check the src string to detect the state instead of using a 'hasTyped' variable
    if (toggleIcon.src.includes('lock_icon')) {
      toggleIcon.src = noVisibilityIconPath;
      passwordInput.type = 'password';
    }
  } else {
    // If the field becomes empty, revert to the lock icon
    toggleIcon.src = lockIconPath;
    passwordInput.type = 'password';
  }
  
  // Update the signup button state (checking if the function exists first)
  if (typeof updateSignupButtonState === 'function') {
    updateSignupButtonState();
  }
}

// ----------------------
// Main Function: Binds the events
// ----------------------
function setupPasswordToggle(passwordId, toggleIconId) {
  const passwordInput = document.getElementById(passwordId);
  const toggleIcon = document.getElementById(toggleIconId);

  if (!passwordInput || !toggleIcon) return;

  // Bind Input Event
  passwordInput.addEventListener('input', () => {
    handlePasswordInput(passwordInput, toggleIcon);
  });

  // Bind Click Event
  toggleIcon.addEventListener('click', (event) => {
    event.preventDefault();
    toggleVisibilityState(passwordInput, toggleIcon);
  });
}

// Initialize password toggles
setupPasswordToggle('auth_password_input', 'toggle_password_icon');
setupPasswordToggle('auth_confirm_password_input', 'toggle_confirm_password_icon');