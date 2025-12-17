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







// /**
//  * Closes the "Add Contact" dialog.
//  * Removes its content and resets all contact input fields.
//  * 
//  * @function closeAddContactDialog
//  * @returns {void} - This function does not return a value.
//  */
// function closeAddContactDialog() {
//   const dialog = document.getElementById('addContactDialog');
//   if (!dialog) return;

//   dialog.close();
//   dialog.innerHTML = "";

//   clearContactInputs();
// }