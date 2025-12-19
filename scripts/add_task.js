// VARIABLES

const subtaskInput = document.getElementById("subtasks");
const subtaskList = document.getElementById("subtaskList");
const subtaskActions = document.querySelector(".subtask_actions");

let editItem = null;


// FUNCTIONS

/**
 * Sets the priority indicator and updates the corresponding button states.
 * Shows the "filled" button for the selected priority and displays the "default" buttons for all other priorities.
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
 * Calls setPriority("medium") and displays it as "default" button after the DOM is loaded.
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
 * Selects category element via onclick. Hides the category list after selection.
 *
 * @param {HTMLElement} element - The clicked category element.
 * @returns {void}
 */
function selectCategory(element) {
  document.getElementById("selected_category").innerHTML = element.innerHTML;
  document.getElementById("category_list").style.display = "none";
}


/**
 * Clears specific input fields and resets the priority to "Medium".
 * After clearing the fields, the function automatically sets the priority button to "default".
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

  document.getElementById("selected_category").innerHTML = "Select task category";
  subtaskList.innerHTML = "";
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
 * @returns {void}
 */
function cancelSubtask() {
  subtaskInput.value = "";
  subtaskActions.style.display = "none";
  editItem = null;
  showSubtaskActions();
}


/**
 * Adds a new subtask to the subtask list.
 * If an item is currently being edited, its text will be replaced.
 * Otherwise, a new list item is created and appended.
 *
 * @function addSubtask
 * @returns {void}
 */
function addSubtask() {
  if (!subtaskInput.value.trim()) return;

  if (editItem) {
    editItem.querySelector(".subtask_text").innerHTML = subtaskInput.value;
  } else {
    subtaskList.innerHTML += `
      <li class="list_element">
        <span class="subtask_text new_subtask">${subtaskInput.value}</span>
        <div class="list_icon_element">
          <button class="subtask_btn edit_subtask" onclick="editSubtask(this)">
            <img class="edit_subtask" src="./assets/img/edit.svg" alt="Edit Subtask">
          </button>
          <button class="subtask_btn" onclick="this.closest('li').remove()">
            <img class="delete_subtask" src="./assets/img/delete.svg" alt="Delete Subtask">
          </button>
        </div>
      </li>`;
  }

  cancelSubtask();
}


/**
 * Enables editing mode for an existing subtask.
 * Loads the selected subtask text into the input field and displays the subtask action buttons.
 *
 * @param {HTMLElement} btn - The edit button of the selected subtask.
 * @returns {void}
 */
function editSubtask(btn) {
  editItem = btn.parentElement;
  subtaskInput.value = editItem.querySelector(".subtask_text").innerHTML;
  showSubtaskActions();
  subtaskInput.focus();
}


/**
 * Limits the number of characters in an input or textarea element.
 *
 * @param {HTMLInputElement|HTMLTextAreaElement} element - The input or textarea element to limit.
 * @param {number} maxLength - The maximum number of characters allowed.
 */
function limitInputLength(element, maxLength) {
  if (element.value.length > maxLength) {
    element.value = element.value.slice(0, maxLength);
  }
}