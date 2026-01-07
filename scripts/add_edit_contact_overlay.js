/**
 * Opens the "Add Contact" dialog if it is not already open and loads the template.
 * setTimeout removes focus from any active element.
 * 
 * @function openAddContactDialog
 * @returns {void} - This function does not return a value.
 */
function openAddContactDialog() {
  const dialog = document.getElementById('addContactDialog');
    
  if (!dialog.open) {
    dialog.innerHTML = addContactTemplate();
    dialog.showModal();

    setTimeout(() => {
      if (document.activeElement) {
        document.activeElement.blur();
      }
    }, 0);
  }
}


/**
 * Closes the "Add Contact" dialog.
 * Removes its content and resets all contact input fields.
 * 
 * @function closeAddContactDialog
 * @returns {void} - This function does not return a value.
 */
function closeAddContactDialog() {
  const dialog = document.getElementById('addContactDialog');
  if (!dialog) return;

  dialog.close();
  dialog.innerHTML = "";

  clearContactInputs();
}


/**
 * Opens the "Edit Contact" dialog if it is not already open and loads the template.
 * setTimeout removes focus from any active element.
 * 
 * @function openEditContactDialog
 * @returns {void} - This function does not return a value.
 */
function openEditContactDialog() {
  const dialog = document.getElementById('editContactDialog');
    
  if (!dialog.open) {
    dialog.innerHTML = editContactTemplate();
    dialog.showModal();

    setTimeout(() => {
      if (document.activeElement) {
        document.activeElement.blur();
      }
    }, 0);
  }
}


/**
 * Closes the "Edit Contact" dialog.
 * Removes its content and resets all contact input fields.
 * 
 * @function closeEditContactDialog
 * @returns {void} - This function does not return a value.
 */
function closeEditContactDialog() {
  const dialog = document.getElementById('editContactDialog');
  if (!dialog) return;

  dialog.close();
  dialog.innerHTML = "";

  clearContactInputs();
}


/**
 * Clears input fields.
 * 
 * @function clearContactInputs
 * @returns {void} - This function does not return a value.
 */
function clearContactInputs() {
  const inputIds = ["name", "email", "phone"];

  inputIds.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
        element.value = "";
      } else {
        element.innerHTML = "";
      }
    }
  });
}


/**
 * Listens for submit events and handles the submission of the contact creation form.
 * Prevents the default form submission behavior and processes the form data asynchronously when the submitted form has the ID "addContactForm".
 *
 * @event submit
 * @param {SubmitEvent} event - The submit event triggered by a form.
 * @async
 */
document.addEventListener("submit", async function (event) {
  if (event.target && event.target.id === "addContactForm") {
    event.preventDefault();
    await getContactData();
     closeAddContactDialog();
     showToast();
  }
});


/**
 * Validates the "Add Contact" form inputs and enables/disables the submit button.
 * Checks name, email, and phone number validity.
 *
 * @returns {boolean} True if the form is valid, otherwise false.
 */
function validateAddContactForm() {
  const name = document.getElementById('id_contact_name')?.value.trim();
  const email = document.getElementById('id_contact_email')?.value.trim();
  const phone = document.getElementById('id_contact_phone')?.value.trim();
  const button = document.getElementById('createContactBtn');

  if (!button) return false;

  const isNameValid = name.length >= 2;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPhoneValid = /^[0-9+\s()-]{5,}$/.test(phone);

  const isFormValid = isNameValid && isEmailValid && isPhoneValid;

  button.disabled = !isFormValid;
  return isFormValid;
}


/**
 * Validates the "Edit Contact" form inputs and enables/disables the save button.
 * Checks name, email, and phone number validity.
 *
 * @returns {boolean} True if the form is valid, otherwise false.
 */
function validateEditContactForm() {
  const name = document.getElementById('name')?.value.trim();
  const email = document.getElementById('email')?.value.trim();
  const phone = document.getElementById('phone')?.value.trim();
  const button = document.getElementById('saveContactBtn');

  if (!button) return false;

  const isNameValid = name.length >= 2;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPhoneValid = /^[0-9+\s()-]{5,}$/.test(phone);

  const isFormValid = isNameValid && isEmailValid && isPhoneValid;

  button.disabled = !isFormValid;
  return isFormValid;
}


/**
 * Handles form submission and runs the corresponding form validator.
 * Prevents submission if validation fails.
 */
document.addEventListener('submit', function (e) {
  const formValidators = {
    addContactForm: validateAddContactForm,
    editContactForm: validateEditContactForm
  };

  const validator = formValidators[e.target.id];

  if (validator && !validator()) {
    e.preventDefault();
  }
});


/**
 * Runs initial validation on page load to set correct button states.
 */
setTimeout(() => {
  document.getElementById('addContactForm') && validateAddContactForm();
  document.getElementById('editContactForm') && validateEditContactForm();
}, 0);