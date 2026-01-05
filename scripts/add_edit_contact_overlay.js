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