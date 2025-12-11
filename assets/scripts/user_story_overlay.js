/**
 * Opens the "User Story" dialog if it is not already open.
 * 
 * @function openUserStoryDialog
 * @returns {void} - This function does not return a value.
 */
function openUserStoryDialog() {
  const dialog = document.getElementById('userStoryDialog');
    
  if (!dialog.open) {
    dialog.showModal();
  }
}


/**
 * Closes the "User Story" dialog.
 * 
 * @function closeUserStoryDialog
 * @returns {void} - This function does not return a value.
 */
function closeUserStoryDialog() {
  const dialog = document.getElementById('userStoryDialog');
  dialog.close();
}