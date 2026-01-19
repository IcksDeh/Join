const subtaskInput = document.getElementById("subtasks");
const subtaskInputEdit = document.getElementById("subtasks_edit");
const subtaskList = document.getElementById("subtaskList");
const subtaskListEdit = document.getElementById("subtaskList_edit");
const subtaskActions = document.querySelector(".subtask_actions");

const priorities = [
  { name: "urgent", color: "red" },
  { name: "medium", color: "yellow" },
  { name: "low", color: "green" },
];

let selectedAssignees = [];
let selectedAssigneesEdit = [];


// --------------------------------
// OPEN & CLOSE DIALOG FUNCTIONS
// --------------------------------

/**
 * Opens the "Add Task" dialog if it is not already open and loads the template.
 * Checks the window width to determine whether to redirect to a mobile page.
 * setTimeout removes focus from any active element.
 *
 * @function openAddTaskDialog
 * @returns {void} - This function does not return a value.
 */
function openAddTaskDialog(status) {
  if (window.innerWidth < 700) {
    window.location.href = "add_task.html";
    return;
  }

  const dialog = document.getElementById("addTaskDialog");
  const btn = document.getElementById("id_btn_create_task_overlay");
  btn.dataset.taskParam = status;

  if (!dialog.open) {
    dialog.showModal();
    checkPriority("medium", dialog);

    setTimeout(() => {
      document.activeElement?.blur();
    }, 0);
  }
}


/**
 * Closes the "Add Task" dialog.
 * Removes its content and resets all contact input fields.
 *
 * @function closeAddTaskDialog
 * @returns {void} - This function does not return a value.
 */
function closeAddTaskDialog(HTMLid) {
  const dialog = document.getElementById("addTaskDialog");
  if (!dialog) return;

  dialog.close();
  clearInputs(HTMLid);
}


// --------------------------------
// RESET & CLEAR INPUT FUNCTIONS
// --------------------------------

/**
 * Resets all task input fields to their default state.
 * Clears input values, removes error styles, hides required messages, and resets the selected category.
 */
function resetInputFields(HTMLid) {
  const inputIds = ["title", "description", "due_date", "subtasks"];
  inputIds.forEach(idElement => {
    const element = document.getElementById("id_" + idElement + "_add_task_" + HTMLid);
    if (element) {
      if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
        element.value = "";
        element.classList.remove("error");
      } else {
        element.innerHTML = "";
      }
      const message = document.querySelector(".required_message[data-for=id_" + idElement + "_add_task]");
      if (message) message.style.display = "none";
    }
  });
  const categorySpan = document.getElementById("selected_category_" + HTMLid);
  categorySpan.innerHTML = "Select task category";
  categorySpan.style.color = "";
}


/**
 * Clears and resets the entire "Add Task" form.
 * Resets input fields, clears assigned contacts and subtasks, closes dropdowns, resets priority, and cancels subtask editing.
 */
function clearInputs(HTMLid) {
  clearSelectedAssignees();
  resetInputFields(HTMLid);
  // document.getElementById("selected_contacts").innerHTML = "Select contacts to assign";
  document.getElementById("selected_contacts_" + HTMLid).innerHTML = "Select contacts to assign";
  document.getElementById("assigned_contacts_row_" + HTMLid).innerHTML = "";
  closeDropdownLists();
  subtaskList.innerHTML = "";
  checkPriority("medium");
  cancelSubtask();
}


// ----------------------------
// CHECK PRIORITY FUNCTIONS
// ----------------------------

/**
 * Updates the UI to reflect the currently selected priority.
 * Iterates over all priorities and activates the matching one.
 *
 * @param {string} status - The currently selected priority name.
 */
function checkPriority(status,suffix, prefix = 'id',) {
  priorities.forEach(({ name, color }) => {
    updatePriorityButton(name, name === status, color, prefix, suffix);
  });
}


/**
 * Updates the appearance of a priority button and its icon.
 * Toggles active/inactive styles and switches the icon based on state.
 *
 * @param {string} priority - The priority name (e.g. "low", "medium", "urgent").
 * @param {boolean} isActive - Whether the priority is currently active.
 * @param {string} color - The default color used for the inactive icon.
 */
function updatePriorityButton(priority, isActive, color, prefix, suffix) {
  const btn = document.getElementById(`${prefix}_${priority}_btn_${suffix}`);
  const icon = document.getElementById(`${prefix}_icon_${priority}_task_${suffix}`);

  if (!btn || !icon) return;
  btn.classList.toggle(`${priority}_btn_filled`, isActive);
  btn.classList.toggle(`${priority}_btn_default`, !isActive);

  icon.src = isActive
    ? `./assets/img/prio_${priority}_white.svg`
    : `./assets/img/prio_${priority}_${color}.svg`;
}


/**
 * Calls checkPriority("medium") and displays it as "default" button after the DOM is loaded.
 *
 * @event DOMContentLoaded
 * @returns {void} - This event handler does not return a value.
 */
document.addEventListener("DOMContentLoaded", () => {
  checkPriority('medium', 'task_detail');
});


// ---------------------
// REQUIRED MESSAGES
// ---------------------

/**
 * Shows or hides a required field message and toggles an error class based on whether the input is empty and focused.
 *
 * @param {HTMLInputElement} input - The input field to validate.
 */
function handleRequiredMessage(input) {
  const message = document.querySelector(`.required_message[data-for="${input.id}"]`);
  if (!message) return;

  if (input === document.activeElement && input.value.trim() === "") {
    message.style.display = "block";
    if (input.classList.contains("validate_required")) {
      input.classList.add("error");
    }
  } else {
    message.style.display = "none";
    input.classList.remove("error");
  }
}


// -----------------------------------
// TOGGLES & CLOSES DROPDOWN LISTS
// -----------------------------------

/**
 * Toggles the visibility of a task-related list element.
 * Shows or hides the corresponding list and triggers additional checks when the list is opened.
 *
 * @function toggleListTasks
 * @param {string} element - The base name of the list to toggle.
 * @returns {void} - This function does not return a value.
 */
function toggleListTasks(element, HTMLid) {
  let list = document.getElementById(element + "_list_task_" + HTMLid);

  if (list.style.display === "none") {
    list.style.display = "block";
    checkContactList(element, HTMLid);
    syncDropdownCheckboxes(HTMLid);
  } else {
    list.style.display = "none";
  }
}


/**
 * Collapses the contacts and category dropdown lists if it is currently expanded.
 *
 * @function closeDropdownLists
 * @returns {void} - This function does not return a value.
 */
function closeDropdownLists() {
  const contactsList = document.getElementById("contacts_list_task");
  if (contactsList) {
    contactsList.style.display = "none";
  }

  const categoryList = document.getElementById("category_list_task");
  if (categoryList) {
    categoryList.style.display = "none";
  }
}


// -----------------------
// ASSIGNEES FUNCTIONS
// -----------------------

/**
 * Checks whether the contact list is already loaded and loads it if necessary.
 * If the contacts are not yet available, data is fetched from Firebase before displaying the contacts in the task view.
 *
 * @async
 * @function checkContactList
 * @param {string} element - The element identifier used to determine which list to check.
 * @returns {Promise<void>} - A promise that resolves when the contact list has been checked and rendered.
 */
async function checkContactList(element, HTMLid){
  if (element == "contacts"){
    if (contactsList.length > 0) {
        showContactsInTasks(HTMLid); 
        return;
    }
  await loadFirebaseData("contacts");
   showContactsInTasks(HTMLid);
  }
}

/**
 * Toggles the selection state of a contact checkbox in the UI.
 * Updates the `selectedAssignees` array and refreshes the assigned contacts display.
 *
 * @param {HTMLImageElement} imgElement - The checkbox image element to toggle.
 * @param {number} index - The index of the contact in the `contactsList` array.
 */
function toggleCheckedIcon(imgElement, index, elementId) {
  const contact = contactsList[index];
  const contactId = contact.id;
  const isChecked = imgElement.dataset.checked === "true";
  let assigneeList = elementId === "default" ? selectedAssignees : selectedAssigneesEdit;

  if (isChecked) {
    assigneeList = assigneeList.filter(c => c.id !== contactId);
    imgElement.dataset.checked = "false";
    imgElement.src = "./assets/img/checkbox_unchecked.svg";
  } else {
    if (!assigneeList.some(c => c.id === contactId)) {
      assigneeList.push(contact);
    }
    imgElement.dataset.checked = "true";
    imgElement.src = "./assets/img/checkbox_checked.svg";
  }
  if (elementId === "default") {
    selectedAssignees = assigneeList;
  } else {
    selectedAssigneesEdit = assigneeList;
  }
  renderAssignedContacts(elementId);

}

/**
 * Renders all selected assignees into the assigned contacts container.
 * Each assignee is displayed with an initial and a background color corresponding to their profile.
 */
function renderAssignedContacts(elementId) {
  const container = document.getElementById("assigned_contacts_row_" + elementId);
  container.innerHTML = "";
  let assigneeList = elementId === "default" ? selectedAssignees: selectedAssigneesEdit;
  console.log(assigneeList);

   assigneeList.forEach(contact => {
      container.innerHTML += 
      `
        <div class="contact_initial_circle assigned_contact"
          data-assignee-id="${contact.id}"
          title="${contact.contact.name}"
          style="background-color:${contact.contact.color}">
          ${contact.contact.initial}
        </div>
      `;
    });
}

/**
 * Synchronizes the checkbox icons in the dropdown list with the current selection.
 * Ensures that each dropdown item accurately reflects whether the corresponding contact is selected.
 */
function syncDropdownCheckboxes(elementId) {
  document.querySelectorAll(".dropdown_item_user").forEach(item => {
    const id = item.dataset.assigneeId;
    const checkbox = item.querySelector(".checkbox_icon");
    let assigneeList = elementId === "default" ? selectedAssignees : selectedAssigneesEdit;

    const checked = assigneeList.some(c => c.id == id);
    checkbox.dataset.checked = checked;
    checkbox.src = checked
      ? "./assets/img/checkbox_checked.svg"
      : "./assets/img/checkbox_unchecked.svg";
  });
}


/**
 * Clears all selected assignees and resets their checkbox icons in the UI.
 * Empties the `selectedAssignees` array, unchecks all checkboxes, and clears the assigned contacts display.
 */
function clearSelectedAssignees() {
  selectedAssignees = [];

  document.querySelectorAll(".checkbox_icon").forEach((checkbox) => {
    checkbox.dataset.checked = "false";
    checkbox.src = "./assets/img/checkbox_unchecked.svg";
  });

  const assignedContainer = document.getElementById("assigned_contacts_row");
  if (assignedContainer) {
    assignedContainer.innerHTML = "";
  }
}


/**
 * Renders the contact list in the task assignment dropdown.
 * Clears the current list and dynamically creates list items for each contact, including their checked state and corresponding icon.
 *
 * @function showContactsInTasks
 * @returns {void} - This function does not return a value.
 */
function showContactsInTasks(HTMLid) {
  console.log(prefillAssigneeCheckbox);
  
  let assigneeList = document.getElementById("contacts_list_task_"+HTMLid);
  assigneeList.innerHTML = "";

  for (let index = 0; index < contactsList.length; index++) {
    console.log(contactsList[index]);
    if (prefillAssigneeCheckbox.includes(contactsList[index].id)){
      contactsList[index].isChecked = true;
    }
    isChecked = contactsList[index].isChecked === true;
    const checkImg = isChecked
      ? "./assets/img/checkbox_checked_contact_form.svg"
      : "./assets/img/checkbox_unchecked_contact_form.svg";

    const checkState = isChecked ? "true" : "false";

    const listElement = document.createElement("li");
    listElement.className = "dropdown_item";

    listElement.innerHTML = listAssigneeTemplate(contactsList, index, checkImg, checkState, HTMLid);
    assigneeList.appendChild(listElement);
  }

  prefillAssigneeCheckbox = [];
}



// -----------------------------------
// CATEGORY LIST
// -----------------------------------

/**
 * Selects category element via onclick. Hides the category list after selection.
 *
 * @param {HTMLElement} element - The clicked category element.
 * @returns {void} - This function does not return a value.
 */
function selectCategory(element, HTMLid) {
  const categorySpan = document.getElementById("selected_category_" + HTMLid);
  categorySpan.innerHTML = element.innerHTML;
  document.getElementById("category_list_task_" + HTMLid).style.display = "none";
  categorySpan.style.color = ""; 
}


// -----------------------
// SUBTASK FUNCTIONS
// -----------------------

/**
 * Shows the subtask action buttons and sets the display style to flex.
 *
 * @function showSubtaskActions
 * @returns {void} - This function does not return a value.
 */
// function showSubtaskActions() {
//   subtaskActions.style.display = "flex";
// }
function showSubtaskActions() {
  if (subtaskActions) subtaskActions.style.display = "flex";
}


/**
 * Cancels the current subtask input.
 * Clears the input field, hides the subtask action buttons and resets the currently edited item.
 *
 * @function cancelSubtask
 * @returns {void} - This function does not return a value.
 */
function cancelSubtask() {
  if (subtaskInput) subtaskInput.value = "";
  if (subtaskInputEdit) subtaskInputEdit.value = "";
  if (subtaskActions) subtaskActions.style.display = "none";
  showSubtaskActions();
}


/**
 * Adds a new subtask to the subtask list.
 * Reads the trimmed value from the subtask input field, creates a new list item using the subtask template, and appends it to the subtask list.
 * After adding the subtask, the input field and related UI elements are reset.
 *
 * @function addSubtask
 * @returns {void} This function does not return a value.
 */
function addSubtask() {
  const input = subtaskInputEdit?.value.trim()
    ? subtaskInputEdit
    : subtaskInput;

  const list = input === subtaskInputEdit
    ? subtaskListEdit
    : subtaskList;

  if (!input || !list) return;
  const value = input.value.trim();
  if (!value) return;
  const li = document.createElement("li");
  li.className = "list_element";
  li.innerHTML = listSubtaskTemplate(value);
  list.appendChild(li);
  input.value = "";
  cancelSubtask();
}


/**
 * Enables edit mode for a subtask.
 *
 * @param {HTMLElement} btn - The button that triggers editing.
 */
function editSubtask(btn) {
  const li = btn.closest("li");
  li.querySelector(".edit_container").style.display = "block";
  li.querySelector(".list_row").style.display = "none";
}


/**
 * Saves the changes made to a subtask.
 *
 * @param {HTMLElement} btn - The button that triggers saving.
 */
function saveEdit(btn) {
  const li = btn.closest("li");
  const newValue = li.querySelector(".subtask_edit_input").value;
  li.querySelector(".subtask_text").innerText = newValue;
  li.querySelector(".edit_container").style.display = "none";
  li.querySelector(".list_row").style.display = "flex";
}


/**
 * Cancels the edit mode and restores the original subtask display.
 *
 * @param {HTMLElement} btn - The button that triggers canceling.
 */
function cancelEdit(btn) {
  const li = btn.closest("li");
  li.querySelector(".edit_container").style.display = "none";
  li.querySelector(".list_row").style.display = "flex";
}


/**
 * Listens for the "Enter" key on the Subtask input field.
 * Prevents the default form submission behavior and calls `addSubtask()` when Enter is pressed.
 *
 * @param {KeyboardEvent} event - The keyboard event triggered on keydown.
 */
subtaskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addSubtask();
  }
});


/**
 * Listens for the "Enter" key on the Subtask Edit input field.
 * Prevents the default form submission behavior and calls `addSubtask()` when Enter is pressed.
 *
 * @param {KeyboardEvent} event - The keyboard event triggered on keydown.
 */
if (subtaskInputEdit) {
  subtaskInputEdit.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addSubtask();
    }
  });
}


// --------------------------------------------------
// CREATE TASK BUTTON & REQUIRED FIELDS FUNCTIONS
// --------------------------------------------------

/**
 * Handles the click event for the "Create Task" button.
 * Prevents the default form submission behavior and triggers the task creation process by collecting and processing task data.
 *
 * @event click
 * @listens HTMLButtonElement#click
 * @returns {Promise<void>} - A promise that resolves when the task data has been processed.
 */
function loadEventlistener(HTMLid){
  const createBtn = document.getElementById("id_btn_create_task_" + HTMLid);
    if(createBtn){ // Sicherheit prüfen
    createBtn.addEventListener("click", async function (event) {
      event.preventDefault(); // Form nicht standardmäßig submitten

      const statusTasks = this.dataset.taskParam;

      if (areRequiredFieldsFilled(HTMLid)) {
        await getAddTaskData(statusTasks, HTMLid);
        showToast();
        setTimeout(() => {
          closeAddTaskDialog('overlay');
          if (HTMLid === "overlay"){
            loadContentBoard();
          }
          window.location.href = "board.html";
        }, 1000);
      } else {
        highlightRequiredFields();
      }
    });
  } else {
    console.warn("Button 'id_btn_create_task_default' nicht gefunden");   
  }
}

/**
 * Checks whether all required task fields are filled.
 * Validates title, due date, and category selection.
 *
 * @returns {boolean} True if all required fields are filled, otherwise false.
 */
function areRequiredFieldsFilled(HTMLid) {
  const title = document.getElementById('id_title_add_task_'+ HTMLid).value.trim();
  const dueDateInput = document.getElementById('id_due_date_add_task_' + HTMLid); 
  const category = document.getElementById('selected_category_'+ HTMLid).textContent.trim();

  const isTitleFilled = title.length > 0;
  const isDueDateFilled = dueDateInput.value.length > 0 && dueDateInput.value >= "2026-01-01";
  
  const isCategoryFilled = category !== 'Select task category';

  return isTitleFilled && isDueDateFilled && isCategoryFilled;
}


/**
 * Highlights missing required fields in the task form.
 * Adds error styles and displays validation messages for empty inputs and an unselected category.
 */
function highlightRequiredFields() {
  const titleInput = document.getElementById('id_title_add_task_'+ HTMLid);
  const dateInput = document.getElementById('id_due_date_add_task_'+ HTMLid);
  const category = document.getElementById('selected_category_'+ HTMLid);
  const dateMsg = document.querySelector('.required_message[data-for="id_due_date_add_task_overlay"]');
  const isTitleEmpty = titleInput.value.trim() === "";
  titleInput.classList.toggle('error', isTitleEmpty);
  document.querySelector('.required_message[data-for="id_title_add_task_overlay"]').style.display = isTitleEmpty ? "block" : "none";
  const isDateError = !dateInput.value || dateInput.value < "2026-01-01";
    
  dateInput.classList.toggle('error', isDateError);
  if (dateMsg) {
    dateMsg.style.display = isDateError ? "block" : "none";
    dateMsg.innerText = dateInput.value ? "Date must be 2026 or later" : "This field is required";
  }

  category.style.color = category.textContent.trim() === "Select task category" ? "#FF3D00" : "";
}