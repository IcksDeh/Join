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



/**
 * Main Login Function - Coordinator
 */
async function login() {
    let { email, password } = getLoginInputs();

    if (!email || !password) {
        alert("Please fill in all fields");
        return;
    }

    try {
        await processLogin(email, password);
    } catch (error) {
        console.error("An error occurred during login.", error);
    }
}

/**
 * Orchestrates the fetch and check logic
 */
async function processLogin(email, password) {
    let usersResponse = await fetchUsers();
    
    if (!usersResponse) {
        console.log("Database error: No users found.");
        return;
    }

    let user = findUserByCredentials(usersResponse, email, password);
    
    if (user) {
        handleLoginSuccess(user);
    } else {
        handleLoginFail();
    }
}

/**
 * Retrieves values from input fields
 */
function getLoginInputs() {
    return {
        email: document.getElementById('auth_input_mail').value,
        password: document.getElementById('auth_password_input').value
    };
}

/**
 * Fetches user data from Firebase
 */
async function fetchUsers() {
    let response = await fetch(BASE_URL + "user.json");
    return await response.json();
}

/**
 * Searches for a matching user in the database object
 */
function findUserByCredentials(usersResponse, email, password) {
    for (let key in usersResponse) {
        let user = usersResponse[key];
        // Note: Using 'eMail' as per your database structure
        if (user.eMail === email && user.password === password) {
            return user;
        }
    }
    return null;
}

/**
 * Handles successful login: Saves to storage and redirects
 */
function handleLoginSuccess(user) {
    let activeUser = {
        name: user.name,
        email: user.eMail,
        initials: getInitials(user.name),
        color: user.color
    };
    
    localStorage.setItem('activeUser', JSON.stringify(activeUser));
    window.location.href = 'summary.html';
}

/**
 * Handles failed login (wrong credentials)
 */
function handleLoginFail() {
    console.log("User not found or wrong password");
}


// Function to get initials (e.g., Anja -> A, Sofia Muller -> SM)
function getInitials(name) {
    if (!name) return "";
    let parts = name.split(' ');
    if (parts.length === 1) {
        return parts[0].charAt(0).toUpperCase();
    } else {
        return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
    }
}