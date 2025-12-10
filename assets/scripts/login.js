function goToSignup() {
  window.location.href = "sign_up.html";
}

function guestLogin() {
  window.location.href = "summary.html";
}

// Icon paths
const lockIconPath = './assets/img/lock_icon.svg';
const noVisibilityIconPath = './assets/img/visibility_off.svg';
const visibilityIconPath = './assets/img/visibility.svg';

/**
 * Generic function to handle password visibility toggles
 * @param {string} passwordId - The ID of the password input field
 * @param {string} toggleIconId - The ID of the toggle icon
 */
function setupPasswordToggle(passwordId, toggleIconId) {
  const passwordInput = document.getElementById(passwordId);
  const toggleIcon = document.getElementById(toggleIconId);

  if (!passwordInput || !toggleIcon) return; // element not present on this page

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

  // Toggle password visibility when icon is clicked
  toggleIcon.addEventListener('click', (event) => {
    event.preventDefault();
    if (passwordInput.value.length > 0) {
      toggleVisibility();
    }
  });
}

// Initialize toggles for all password fields
setupPasswordToggle('auth_password_input', 'toggle_password_icon');
setupPasswordToggle('auth_confirm_password_input', 'toggle_confirm_password_icon');

// Enable or disable signup button based on checkbox
const checkbox = document.querySelector('.checkbox-row input[type="checkbox"]');
const signupBtn = document.getElementById('signup_btn');

if (checkbox && signupBtn) {
  checkbox.addEventListener('change', () => {
    signupBtn.disabled = !checkbox.checked;

    // Change button color based on checkbox state
    if (checkbox.checked) {
      signupBtn.style.backgroundColor = '#2a3647'; // normal color
      signupBtn.style.color = 'white';
    } else {
      signupBtn.style.backgroundColor = '#999'; // faded color
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

function login_oninit() {
  loadLogOffSidebar();
  loadLogOffNavbar();
}
