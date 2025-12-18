const ICONS = {
  LOCK: './assets/img/lock_icon.svg',
  OFF: './assets/img/visibility_off.svg',
  ON: './assets/img/visibility.svg'
};

function goToSignup() { window.location.href = "sign_up.html"; }
function guestLogin() { window.location.href = "summary.html"; }

// ---------------- Element Selectors ----------------
function getElementsUser() {
  return {
    checkbox: document.querySelector('.checkbox-row input[type="checkbox"]'),
    btn: document.getElementById('signup_btn'),
    name: document.getElementById('auth_input_name'),
    email: document.getElementById('auth_input_mail'),
    pass: document.getElementById('auth_password_input'),
    confirm: document.getElementById('auth_confirm_password_input'),
    errorMsg: document.getElementById('confirm_password_error')
  };
}

// ---------------- Password Icon Logic (Visuals Only) ----------------
function toggleIconState(input, icon) {
  if (input.value.length === 0) return;
  
  const isPass = input.type === 'password';
  input.type = isPass ? 'text' : 'password';
  icon.src = isPass ? ICONS.ON : ICONS.OFF;
}

function updateIconOnInput(input, icon) {
  if (input.value.length > 0) {
    if (icon.src.includes('lock_icon')) {
      icon.src = ICONS.OFF;
      input.type = 'password';
    }
  } else {
    icon.src = ICONS.LOCK;
    input.type = 'password';
  }
}

function setupToggle(inputId, iconId) {
  const input = document.getElementById(inputId);
  const icon = document.getElementById(iconId);
  if (!input || !icon) return;

  input.addEventListener('input', () => updateIconOnInput(input, icon));
  icon.addEventListener('click', (e) => {
    e.preventDefault();
    toggleIconState(input, icon);
  });
}

// ---------------- Validation Logic ----------------
function isValid(els) {
  return (
    els.name.value.trim() !== '' &&
    els.email.validity.valid &&
    els.pass.value.length > 0 &&
    els.pass.value === els.confirm.value &&
    els.checkbox.checked
  );
}

function updateBtn(els) {
  const valid = isValid(els);
  els.btn.disabled = !valid;
  
  if (valid) {
    els.btn.style.backgroundColor = '#2a3647';
    els.btn.style.color = 'white';
    els.btn.style.cursor = 'pointer';
  } else {
    els.btn.style.backgroundColor = '#999';
    els.btn.style.color = '#eee';
    els.btn.style.cursor = 'not-allowed';
  }
}

function handlePasswordMatch(els) {
  const match = els.pass.value === els.confirm.value;
  
  if (!match && els.confirm.value.length > 0) {
    els.confirm.classList.add('error');
    els.errorMsg.style.display = 'block';
    els.errorMsg.textContent = "Your passwords don't match.Please try again";
  } else {
    els.confirm.classList.remove('error');
    els.errorMsg.style.display = 'none';
  }
  updateBtn(els);
}

// ---------------- Event Listeners ----------------
function addBasicListeners(els) {
  const check = () => updateBtn(els);
  
  els.name.addEventListener('input', check);
  els.email.addEventListener('input', check);
  els.checkbox.addEventListener('change', check);
}

function addPasswordListeners(els) {
  let touched = false; // Local state to track interaction

  els.confirm.addEventListener('input', () => {
    touched = true;
    els.confirm.classList.remove('error'); // Clear error while typing
    els.errorMsg.style.display = 'none';
    updateBtn(els);
  });

  els.confirm.addEventListener('blur', () => {
    if (touched) handlePasswordMatch(els);
  });

  els.pass.addEventListener('input', () => {
    touched ? handlePasswordMatch(els) : updateBtn(els);
  });
}

// ---------------- Initialization ----------------
function initSignupForm() {
  const els = getElementsUser();
  if (!els.btn || !els.pass) return;

  setupToggle('auth_password_input', 'toggle_password_icon');
  setupToggle('auth_confirm_password_input', 'toggle_confirm_password_icon');
  
  addBasicListeners(els);
  addPasswordListeners(els);
  
  // Run once on load to check initial state (e.g. browser autofill)
  updateBtn(els);
}

initSignupForm();

document.getElementById('signup_btn').addEventListener("click", async function(event){
    event.preventDefault();
    await getUserData();
    }
)

async function getUserData(){
  const elements = getElementsUser();
 
  let userName = elements.name.value;
  let userEmail = elements.email.value;
  let userPassword = elements.pass.value;
  let userColor = getRandomColor();
  await switchUserData(userName, userEmail, userColor, elements, userPassword);
  await switchContactsData(userName, userEmail, userColor);
}


  // sinnvoll zusammenfassen? 
  async function switchUserData(userName, userEmail, userColor, elements, userPassword){
   let userData = {
        "name" : userName,
        "eMail" : userEmail,
        "password" : userPassword,
        "color" : userColor,
        }   
    await putToStorage("user", userData, elements);
}
