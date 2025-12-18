/**
 * Sets the priority indicator and updates the corresponding button states.
 * * Shows the “filled” button for the selected priority and displays the “default” buttons for all other priorities.
 *
 * @param {"urgent"|"medium"|"low"} level - The priority to activate.
 * @param {Document|HTMLElement} [root=document] - Root element used for DOM queries.
 * @returns {void} - This function does not return a value; it updates the UI only.
 */
function setPriority(level, root = document) {
  const priorities = ["urgent", "medium", "low"];

  const toggle = (prio, active) => {
    const def = root.querySelector(`#${prio}_btn_default`);
    const fill = root.querySelector(`#${prio}_btn_filled`);
    if (!def || !fill) return;

    def.classList.toggle("d_none", active);
    fill.classList.toggle("d_none", !active);
  };

  priorities.forEach(prio => toggle(prio, prio === level));
}


/**
 * Calls setPriority("medium") after the DOM is loaded.
 */
document.addEventListener("DOMContentLoaded", () => {
  setPriority("medium");
});


/**
 * Toggles the visibility of the contacts to assign.
 *
 * @function toggleContactsList
 * @returns {void} - This function does not return a value. 
 */
function toggleContactsList() {
  let list = document.getElementById("contacts_list");
    
  if (list.style.display === "none") {
    list.style.display = "block";
  } else {
    list.style.display = "none";
  }
}


/**
 * Toggles the visibility of the category dropdown list.
 *
 * @function toggleCategoryList
 * @returns {void} - This function does not return a value. 
 */
function toggleCategoryList() {
  let list = document.getElementById("category_list");
    
  if (list.style.display === "none") {
    list.style.display = "block";
  } else {
    list.style.display = "none";
  }
}


/**
 * Clears specific input fields and resets the priority to "Medium".
 * After clearing the fields, the function automatically sets the priority button
 * to "Medium" by calling `setPriority("medium")`.
 * 
 * @function clearInputs
 * @returns {void} - This function does not return a value.
 */
function clearInputs() {
  const inputIds = ["title", "description", "due_date", "subtasks"];

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

  setPriority("medium");
}


/**
 * Opens the "Add Task" dialog if it is not already open and loads the template.
 * setTimeout removes focus from any active element.
 * 
 * @function openAddTaskDialog
 * @returns {void} - This function does not return a value.
 */
function openAddTaskDialog() {
  const dialog = document.getElementById('addTaskDialog');

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
  const dialog = document.getElementById('addTaskDialog');
  if (!dialog) return;

  dialog.close();
  dialog.innerHTML = "";

  clearInputs();
}


/**
 * Sets min and max values for the due date input after DOMContentLoaded.
 */
window.addEventListener('DOMContentLoaded', () => {
  const dueDateInput = document.getElementById('due_date');
  if (!dueDateInput) return;

  const today = new Date();
  const isoToday = today.toISOString().split('T')[0];

  const maxDate = new Date();
  maxDate.setFullYear(today.getFullYear() + 5);

  dueDateInput.min = isoToday;
  dueDateInput.max = maxDate.toISOString().split('T')[0];
});