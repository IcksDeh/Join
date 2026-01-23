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
  renderContactList()
  clearContactInputs();
}


/**
 * Opens the "Edit Contact" dialog if it is not already open and loads the template.
 * setTimeout removes focus from any active element.
 * 
 * @function openEditContactDialog
 * @returns {void} - This function does not return a value.
 */
function openEditContactDialog(id) {
  const dialog = document.getElementById('editContactDialog');
  const selectedContact = contactsArray.find(entry => entry.id == id);
  if (!dialog.open) {
    dialog.innerHTML = editContactTemplate(selectedContact);
    dialog.showModal();
    setTimeout(() => {
      if (document.activeElement) {
        document.activeElement.blur();
      }
    }, 0);
  }
}


/**
 * Updates a contact in Firebase using a PATCH request.
 * 
 * @function updateContactInFirebase
 * @param {string} id - The ID of the contact to update.
 * @param {Object} updatedContact - The updated contact data.
 * @returns {Promise<void>} A promise that resolves when the update is complete.
 */
async function updateContactInFirebase(id, updatedContact) {
  singleContact = fetch(BASE_URL + "contacts/" + id + ".json", {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedContact),
  });
  singleContact.then(response => {
    if (!response.ok) {
      throw new Error(`HTTP Fehler! Status: ${response.status}`);
    }
    return response.json();
  })
    .then(data => {
      // console.log("Erfolgreich geupdatet:", data);
    })
    .catch(error => {
      // console.error("Fehler beim PATCH:", error);
    });
}


/**
 * Updates a contact in the local contacts array by ID.
 * 
 * @function updateContactById
*/
function updateContactById(id, updatedContact) {
  let contactData = contactsArray.find(entry => entry.id == id);
  if (contactData) {
    contactData.name = updatedContact.name;
    contactData.eMail = updatedContact.eMail;
    contactData.phoneNumber = updatedContact.phoneNumber;
    contactsArray.sort((a, b) => a.name.localeCompare(b.name));
    // console.log("Lokale Daten aktualisiert:", contactData);
  } else {
    // console.error("Kontakt nicht gefunden mit ID:", id);
  }
}


/**
 * Retrieves updated contact data from input fields and updates the contact in Firebase.
 * 
 * @function getUpdatedContactData
 * @param {string} id - The ID of the contact to update.
 * @returns {Promise<void>} - A promise that resolves when the update is complete.
 */
async function getUpdatedContactData(id) {
  const nameInput = document.getElementById('input-name').value;
  const emailInput = document.getElementById('input-email').value;
  const phoneInput = document.getElementById('input-phone').value;
  const updatedContact = {
    name: nameInput,
    eMail: emailInput,
    phoneNumber: phoneInput,
    initial: getContactInitials(nameInput),
  };
  updateContactById(id, updatedContact);
  return await updateContactInFirebase(id, updatedContact);
}


/**
 * Updates a contact by ID after validating the edit form.
 * Closes the edit dialog, re-renders the contact list and info, and shows a toast notification.
 * 
 * @function updateContact
 * @param {string} id - The ID of the contact to update.
 * @returns {Promise<void>} - A promise that resolves when the update is complete.
 */
async function updateContact(id) {
  validateEditContactForm();
  const contact = contactsArray.find(c => c.id === id);
  const oldName = contact.name;
  const oldMail = contact.eMail;
  const newName = document.getElementById('input-name').value.trim();
  const newMail = document.getElementById('input-email').value.trim();
  await getUpdatedContactData(id);
  if (oldName !== newName) {
    await updateAssigneeInTasksSafe(id, newName);
  }
  if (oldMail !== newMail || oldName !== newName && document.querySelector('myActiveUser') != null) {
    await checkContactInUser(oldName, oldMail, newName, newMail)
  }

  closeEditContactDialog();
  renderLocalContactList();
  renderLocalContactInfo(id);
  showToastUpdate();
  checkActiveUser()
}


/**
 * Displays a toast notification indicating a contact has been updated.
 * The message is shown for 2 seconds before reverting to the creation message.
 * 
 * @function showToastUpdate
 */
function showToastUpdate() {
  const msgBox = document.getElementById('msgBox');
  const overlayElement = document.querySelector('dialog[open]');
  if (overlayElement) {
    overlayElement.appendChild(msgBox);
  } else {
    document.body.appendChild(msgBox);
    msgBox.innerHTML = "Contact updated successfully!";
  }
  msgBox.classList.add('show');
  setTimeout(() => {
    msgBox.innerHTML = "Contact successfully created!";
    msgBox.classList.remove('show');
  }, 2000);
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
  const contactName = document.getElementById('input-name')?.value.trim();
  const contactEmail = document.getElementById('input-email')?.value.trim();
  const contactPhone = document.getElementById('input-phone')?.value.trim();
  const submitbutton = document.getElementById('saveContactBtn');
  if (!submitbutton) return false;
  const isNameValid = contactName.length >= 2;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail);
  const isPhoneValid = /^[0-9+\s()-]{5,}$/.test(contactPhone);
  const isFormValid = isNameValid && isEmailValid && isPhoneValid;
  submitbutton.disabled = !isFormValid;
  return isFormValid;
}


/**
 * Handles form submission and runs the corresponding form validator.
 * Prevents submission if validation fails.
 */
// document.addEventListener('submit', function (event) {
//   if (event.target && event.target.id === 'editContactForm') {
//     const formValidators = {
//       addContactForm: validateAddContactForm(),
//       editContactForm: validateEditContactForm()
//     };
//     console.log(formValidators);

//     const validator = formValidators[event.target.id];

//     if (!validator) {
//       event.preventDefault();
//     }
//   }
// });


/**
 * Runs initial validation on page load to set correct button states.
 */
// setTimeout(() => {
//   document.getElementById('addContactForm') && validateAddContactForm();
//   document.getElementById('editContactForm') && validateEditContactForm();
// }, 0);