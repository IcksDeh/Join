// ----------------------
// Sign up function
// ----------------------

function signup(event) {
  event.preventDefault(); // Prevent the page from reloading

  const name = document.getElementById("auth_input_name").value;
  const email = document.getElementById("auth_input_mail").value;
  const password = document.getElementById("auth_password_input").value;
  const confirmPassword = document.getElementById("auth_confirm_password_input").value;

  // Check if passwords match
  if (password !== confirmPassword) {
    document.getElementById("confirm_password_error").innerText = "Passwords do not match!";
    return;
  }

  const userData = {
    username: name,
    email: email,
    password: password,
    phoneNumber: ""
  };

  // Correct Firebase URL
  fetch("https://join-f5da0-default-rtdb.europe-west1.firebasedatabase.app/user.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  })
  .then(response => response.json())
  .then(data => {
    console.log("User created:", data);
    showCenteredMessage("You signed up successfully!");
    // Optional redirect after 3 seconds
    setTimeout(() => {
      window.location.href = "index.html";
    }, 3000);
  })
  .catch(error => {
    console.error("Error:", error);
  });
}

function showCenteredMessage(message) {
  // Create the message div
  const msgDiv = document.createElement('div');
  msgDiv.textContent = message;
  msgDiv.style.position = 'fixed';
  msgDiv.style.top = '50%';
  msgDiv.style.left = '50%';
  msgDiv.style.transform = 'translate(-50%, -50%)';
  msgDiv.style.backgroundColor = '#2a3647';
  msgDiv.style.color = 'white';
  msgDiv.style.padding = '20px 30px';
  msgDiv.style.borderRadius = '8px';
  msgDiv.style.boxShadow = '0 4px 10px rgba(0,0,0,0.3)';
  msgDiv.style.fontSize = '18px';
  msgDiv.style.zIndex = '1000';
  msgDiv.style.textAlign = 'center';
  msgDiv.style.opacity = '0';
  msgDiv.style.transition = 'opacity 0.3s ease';

  // Append to the body
  document.body.appendChild(msgDiv);

  // Fade in the message
  requestAnimationFrame(() => {
    msgDiv.style.opacity = '1';
  });

  // Fade out and remove after 3 seconds
  setTimeout(() => {
    msgDiv.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(msgDiv);
    }, 300);
  }, 3000);
}

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
