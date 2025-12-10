/**
 * Opens the "Add Contact" dialog if it is not already open.
 * 
 * @function openAddContactDialog
 * @returns {void} - This function does not return a value.
 */
function openAddContactDialog() {
  const dialog = document.getElementById('addContactDialog');
    
  if (!dialog.open) {
    dialog.showModal();
  }
}


/**
 * Closes the "Add Contact" dialog.
 * 
 * @function closeAddContactDialog
 * @returns {void} - This function does not return a value.
 */
function closeAddContactDialog() {
  const dialog = document.getElementById('addContactDialog');
  dialog.close();
}


/**
 * Opens the "Edit Contact" dialog if it is not already open.
 * 
 * @function openEditContactDialog
 * @returns {void} - This function does not return a value.
 */
function openEditContactDialog() {
  const dialog = document.getElementById('editContactDialog');
    
  if (!dialog.open) {
    dialog.showModal();
  }
}


/**
 * Closes the "Edit Contact" dialog.
 * 
 * @function closeEditContactDialog
 * @returns {void} - This function does not return a value.
 */
function closeEditContactDialog() {
  const dialog = document.getElementById('editContactDialog');
  dialog.close();
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