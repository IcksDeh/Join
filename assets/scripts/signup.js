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


function getUserData(){
  let userID = newUserID + 1;
  newUserID = userID;
  let userName = nameInput.value;
  let userEmail = emailInput.value;
  let userPassword = passwordInput.value;
  pushToUserData(newUserID, userName, userEmail, userPassword);
}
