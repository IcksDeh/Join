// VARIABLES

const subtaskInput = document.getElementById("subtasks");
const subtaskList = document.getElementById("subtaskList");
const subtaskActions = document.querySelector(".subtask_actions");

let editItem = null;


// FUNCTIONS


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
 *
 * @event DOMContentLoaded
 * @returns {void} - This event handler does not return a value.
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
 * @returns {void} - This function does not return a value.
 */
function selectCategory(element) {
  document.getElementById("selected_category").innerHTML = element.innerHTML;
  document.getElementById("category_list").style.display = "none";
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
  closeContactsList()
  subtaskList.innerHTML = "";
  setPriority("medium");
}


/**
 * Toggles the checked state of the checkbox icon in 'Assigned to' dropdown list.
 *
 * @param {HTMLImageElement} img
 * The image element representing the checkbox icon.
 * Must contain a 'data-checked' attribute ('true' or 'false').
 */
function toggleCheckedIcon(img) {
  const checked = img.dataset.checked === "true";
  img.dataset.checked = !checked;

  img.src = checked
    ? "./assets/img/checkbox_unchecked_contact_form.svg"
    : "./assets/img/checkbox_checked_contact_form.svg";
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
  // editItem = null;
  showSubtaskActions();
}


/**
 * Adds a new subtask to the subtask list.
 * Reads the value from the input, creates a list item with edit and delete buttons, and appends it to the subtask list.
 */
function addSubtask() {
  const value = subtaskInput.value.trim();
  if (!value) return;

  const li = document.createElement('li');
  li.className = 'list_element';
  li.innerHTML = `
    <div class="list_row">
      <span class="subtask_text new_subtask">${value}</span>
      <div class="list_icon_element">
        <button class="subtask_btn edit_subtask" type="button" onclick="editSubtask(this)">
          <img class="edit_subtask" src="./assets/img/edit.svg" alt="Edit Subtask">
        </button>
        <button class="subtask_btn" type="button" onclick="this.closest('li').remove()">
          <img class="delete_subtask" src="./assets/img/delete.svg" alt="Delete Subtask">
        </button>
      </div>
    </div>

    <div class="edit_container" style="display:none;">
      <input type="text" class="subtask_edit_input styled_input" value="${value}" oninput="limitInputLength(this, 25)">
      <hr class="subtask_edit_hr">
      <div class="subtask_edit_area">
        <button class="subtask_edit_btn" type="button" onclick="cancelEdit(this)">
          <img class="cancel_subtask_edit" src="./assets/img/delete.svg" alt="Delete Subtask">
        </button>
        <button class="subtask_edit_btn" type="button" onclick="saveEdit(this)">
          <img class="submit_subtask" src="./assets/img/check.svg" alt="Submit Edited Version">
        </button>
      </div>
    </div>
  `;
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
  const li = btn.closest('li');
  li.querySelector('.edit_container').style.display = 'block';
  li.querySelector('.list_row').style.display = 'none';
}


/**
 * Saves the changes made to a subtask.
 * 
 * @param {HTMLElement} btn - The button that triggers saving.
 */
function saveEdit(btn) {
  const li = btn.closest('li');
  const newValue = li.querySelector('.subtask_edit_input').value;
  li.querySelector('.subtask_text').innerText = newValue;
  li.querySelector('.edit_container').style.display = 'none';
  li.querySelector('.list_row').style.display = 'flex';
}


/**
 * Cancels the edit mode and restores the original subtask display.
 * 
 * @param {HTMLElement} btn - The button that triggers canceling.
 */
function cancelEdit(btn) {
  const li = btn.closest('li');
  li.querySelector('.edit_container').style.display = 'none';
  li.querySelector('.list_row').style.display = 'flex';
}