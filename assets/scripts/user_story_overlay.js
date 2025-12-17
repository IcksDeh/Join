/**
 * Opens the "User Story" dialog if it is not already open and loads the template.
 * setTimeout removes focus from any active element.
 * 
 * @function openUserStoryDialog
 * @returns {void} - This function does not return a value.
 */
function openUserStoryDialog() {
  const dialog = document.getElementById('userStoryDialog');
    
  if (!dialog.open) {
    dialog.innerHTML = userStoryTemplate();
    dialog.showModal();

    setTimeout(() => {
      if (document.activeElement) {
        document.activeElement.blur();
      }
    }, 0);
  }
}


/**
 * Closes the "User Story" dialog.
 * Removes its content and resets all contact input fields.
 * 
 * @function closeUserStoryDialog
 * @returns {void} - This function does not return a value.
 */
function closeUserStoryDialog() {
  const dialog = document.getElementById('userStoryDialog');
  if (!dialog) return;

  dialog.close();
  dialog.innerHTML = "";

  clearContactInputs();
}


/**
 * Opens the "User Story" dialog if it is not already open and loads the template.
 * setTimeout removes focus from any active element.
 * 
 * @function openUserStoryEditDialog
 * @returns {void} - This function does not return a value.
 */
function openUserStoryEditDialog() {
  const dialog = document.getElementById('userStoryEditDialog');
    
  if (!dialog.open) {
    dialog.innerHTML = userStoryEditTemplate();
    dialog.showModal();

    setTimeout(() => {
      if (document.activeElement) {
        document.activeElement.blur();
      }
    }, 0);
  }
}


/**
 * Closes the "User Story" dialog.
 * Removes its content and resets all contact input fields.
 * 
 * @function closeUserStoryEditDialog
 * @returns {void} - This function does not return a value.
 */
function closeUserStoryEditDialog() {
  const dialog = document.getElementById('userStoryEditDialog');
  if (!dialog) return;

  dialog.close();
  dialog.innerHTML = "";

  clearUserStoryInputs();
}


/**
 * Clears input fields.
 * 
 * @function clearUserStoryInputs
 * @returns {void} - This function does not return a value.
 */
function clearUserStoryInputs() {
  const inputIds = ["name", "email", "phone"];  // To be proofed!

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