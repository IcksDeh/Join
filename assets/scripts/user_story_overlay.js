/**
 * Opens the "User Story" dialog if it is not already open.
 * setTimeout removes focus from any active element.
 * 
 * @function openUserStoryDialog
 * @returns {void} - This function does not return a value.
 */
function openUserStoryDialog() {
  const dialog = document.getElementById('userStoryDialog');
    
  if (!dialog.open) {
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
 * 
 * @function closeUserStoryDialog
 * @returns {void} - This function does not return a value.
 */
function closeUserStoryDialog() {
  const dialog = document.getElementById('userStoryDialog');
  dialog.close();
}