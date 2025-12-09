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