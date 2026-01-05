// VARIABLES

const subtaskInput = document.getElementById("subtasks");
const subtaskList = document.getElementById("subtaskList");
const subtaskActions = document.querySelector(".subtask_actions");

const priorities = [
  { name: "urgent", color: "red" },
  { name: "medium", color: "yellow" },
  { name: "low", color: "green" },
];


// FUNCTIONS

/**
 * Opens the "Add Task" dialog if it is not already open and loads the template.
 * setTimeout removes focus from any active element.
 *
 * @function openAddTaskDialog
 * @returns {void} - This function does not return a value.
 */
function openAddTaskDialog() {
  const dialog = document.getElementById("addTaskDialog");

  if (!dialog.open) {
    dialog.innerHTML = addTaskTemplate();
    dialog.showModal();

    setPriority("medium", dialog);

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
function closeAddTaskDialog() {
  const dialog = document.getElementById("addTaskDialog");
  if (!dialog) return;

  dialog.close();
  dialog.innerHTML = "";

  clearInputs();
}


/**
 * Sets the selected priority and updates the UI accordingly.
 * Iterates over all available priorities and highlights the selected one while resetting all other priority buttons to their default state.
 *
 * @function checkPriority
 * @param {string} status - The name of the priority to be selected.
 * @returns {void} - This function does not return a value.
 */
function checkPriority(status) {
  priorities.forEach(({ name, color }) => {
    if (name == status) {
      markPriorityButton(name);
    } else {
      removeMarkOtherButton(name, color);
    }
  });
}


/**
 * Marks a priority button as active.
 * Changes the button styling to the filled state and updates the icon color to white.
 *
 * @function markPriorityButton
 * @param {string} priorityElement - The name of the priority to be marked as active.
 * @returns {void} - This function does not return a value.
 */
function markPriorityButton(priorityElement) {
  document
    .getElementById("id_" + priorityElement + "_btn")
    .classList.remove(priorityElement + "_btn_default");
  document
    .getElementById("id_" + priorityElement + "_btn")
    .classList.add(priorityElement + "_btn_filled");
  document.getElementById("id_icon_" + priorityElement + "_task").src =
    "./assets/img/prio_" + priorityElement + "_white.svg";
}


/**
 * Resets a priority button to its default state.
 * Restores the default button styling and sets the icon color based on the priority.
 *
 * @function removeMarkOtherButton
 * @param {string} priorityElement - The name of the priority to be reset.
 * @param {string} color - The color used for the default priority icon.
 * @returns {void} - This function does not return a value.
 */
function removeMarkOtherButton(priorityElement, color) {
  document
    .getElementById("id_" + priorityElement + "_btn")
    .classList.add(priorityElement + "_btn_default");
  document
    .getElementById("id_" + priorityElement + "_btn")
    .classList.remove(priorityElement + "_btn_filled");
  document.getElementById("id_icon_" + priorityElement + "_task").src =
    "./assets/img/prio_" + priorityElement + "_" + color + ".svg";
}


/**
 * Calls checkPriority("medium") and displays it as "default" button after the DOM is loaded.
 *
 * @event DOMContentLoaded
 * @returns {void} - This event handler does not return a value.
 */
document.addEventListener("DOMContentLoaded", () => {
  checkPriority("medium");
});


/**
 * Toggles the visibility of a task-related list element.
 * Shows or hides the corresponding list and triggers additional checks when the list is opened.
 *
 * @function toggleListTasks
 * @param {string} element - The base name of the list to toggle.
 * @returns {void} - This function does not return a value.
 */
function toggleListTasks(element) {
  let list = document.getElementById(element + "_list_task");

  if (list.style.display === "none") {
    list.style.display = "block";
    checkContactList(element);
  } else {
    list.style.display = "none";
  }
}


/**
 * Checks whether the contact list is already loaded and loads it if necessary.
 * If the contacts are not yet available, data is fetched from Firebase before displaying the contacts in the task view.
 *
 * @async
 * @function checkContactList
 * @param {string} element - The element identifier used to determine which list to check.
 * @returns {Promise<void>} - A promise that resolves when the contact list has been checked and rendered.
 */
async function checkContactList(element){
  if (element == "contacts"){
    if (contactsList.length > 0) {
        showContactsInTasks(); 
        return;
    }
    
    await loadFirebaseData("contacts", contacts);
    showContactsInTasks();
  }
}


/**
 * Selects category element via onclick. Hides the category list after selection.
 *
 * @param {HTMLElement} element - The clicked category element.
 * @returns {void} - This function does not return a value.
 */
function selectCategory(element) {
  document.getElementById("selected_category").innerHTML = element.innerHTML;
  document.getElementById("category_list_task").style.display = "none";
}


/**
 * Collapses the contacts dropdown list if it is currently expanded.
 *
 * @function closeContactsList
 * @returns {void} - This function does not return a value.
 */
function closeContactsList() {
  const contactsList = document.getElementById("contacts_list");

  if (contactsList) {
    contactsList.style.display = "none";
  }
}


/**
 * Clears specific input fields and resets the priority to "medium".
 * After clearing the fields, the function automatically sets the priority button to "default".
 *
 * @function clearInputs
 * @returns {void} - This function does not return a value.
 */
function clearInputs() {
  const inputIds = ["title", "description", "due_date", "subtasks"];

  inputIds.forEach((id) => {
    const element = document.getElementById("id_" + id + "_add_task");
    if (element) {
      if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
        element.value = "";
      } else {
        element.innerHTML = "";
      }
    }
  });

  document.getElementById("selected_category").innerHTML = "Select task category";
  closeContactsList();
  subtaskList.innerHTML = "";
  checkPriority("medium");
  cancelSubtask();
}


/**
 * Toggles the checked state of the checkbox icon in 'Assigned to' dropdown list.
 *
 * @param {HTMLImageElement} img
 * The image element representing the checkbox icon.
 * Must contain a 'data-checked' attribute ('true' or 'false').
 */
function toggleCheckedIcon(img, index) {
  const isChecked = img.dataset.checked === "true";
  const newStatus = !isChecked;

  img.dataset.checked = newStatus ? "true" : "false";
  img.src = newStatus
    ? "./assets/img/checkbox_checked_contact_form.svg"
    : "./assets/img/checkbox_unchecked_contact_form.svg";
  if (contactsList[index]) {
    contactsList[index].isChecked = newStatus;
  }
}


/**
 * Shows the subtask action buttons and sets the display style to flex.
 *
 * @function showSubtaskActions
 * @returns {void} - This function does not return a value.
 */
function showSubtaskActions() {
  subtaskActions.style.display = "flex";
}


/**
 * Cancels the current subtask input.
 * Clears the input field, hides the subtask action buttons and resets the currently edited item.
 *
 * @function cancelSubtask
 * @returns {void} - This function does not return a value.
 */
function cancelSubtask() {
  subtaskInput.value = "";
  subtaskActions.style.display = "none";
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
  const value = subtaskInput.value.trim();
  if (!value) return;

  const li = document.createElement("li");
  li.className = "list_element";
  li.innerHTML = listSubtaskTemplate(value);
  subtaskList.appendChild(li);
  subtaskInput.value = "";
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
 * Handles the click event for the "Create Task" button.
 * Prevents the default form submission behavior and triggers the task creation process by collecting and processing task data.
 *
 * @event click
 * @listens HTMLButtonElement#click
 * @returns {Promise<void>} - A promise that resolves when the task data has been processed.
 */
document
  .getElementById("id_btn_create_task")
  .addEventListener("click", async function (event) {
    event.preventDefault();
    await getAddTaskData();
  });


/**
 * Renders the contact list in the task assignment dropdown.
 * Clears the current list and dynamically creates list items for each contact, including their checked state and corresponding icon.
 *
 * @function showContactsInTasks
 * @returns {void} - This function does not return a value.
 */
function showContactsInTasks() {
  let assigneeList = document.getElementById("contacts_list_task");
  assigneeList.innerHTML = "";

  for (let index = 0; index < contactsList.length; index++) {
    console.log(contactsList[index]);
    const isChecked = contactsList[index].isChecked === true;
    const checkImg = isChecked
      ? "./assets/img/checkbox_checked_contact_form.svg"
      : "./assets/img/checkbox_unchecked_contact_form.svg";

    const checkState = isChecked ? "true" : "false";

    const listElement = document.createElement("li");
    listElement.className = "dropdown_item";

    listElement.innerHTML = listAssigneeTemplate(
      contactsList, index, checkImg, checkState
    );
    assigneeList.appendChild(listElement);
  }
}


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
    if (input.classList.contains("validate-required")) {
      input.classList.add("error");
    }
  } else {
    message.style.display = "none";
    input.classList.remove("error");
  }
}