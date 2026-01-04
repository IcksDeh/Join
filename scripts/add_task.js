// VARIABLES

const subtaskInput = document.getElementById("subtasks");
const subtaskList = document.getElementById("subtaskList");
const subtaskActions = document.querySelector(".subtask_actions");

let editItem = null;

const priorities = [
    {"name": "urgent", "color": "red"},
    {"name": "medium", "color":"yellow"},
    {"name": "low", "color":"green"},
  ]

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

function checkPriority(status){
    priorities.forEach(({name, color}) => {
    if (name == status){  
      markPriorityButton(name);
    } else {
      removeMarkOtherButton(name, color);
    }     
  })
}

// Funktion noch zusammenfassen, da sie prinzipiell dasgleiche macht. 
function markPriorityButton(priorityElement){
  document.getElementById('id_'+ priorityElement +'_btn').classList.remove(priorityElement +'_btn_default');
  document.getElementById('id_'+ priorityElement +'_btn').classList.add(priorityElement +'_btn_filled');
  document.getElementById('id_icon_'+ priorityElement +'_task').src = "./assets/img/prio_" + priorityElement + "_white.svg";
}

function removeMarkOtherButton(priorityElement, color){
  document.getElementById('id_'+ priorityElement +'_btn').classList.add(priorityElement +'_btn_default');
  document.getElementById('id_'+ priorityElement +'_btn').classList.remove(priorityElement +'_btn_filled');
  document.getElementById('id_icon_'+ priorityElement +'_task').src = "./assets/img/prio_" + priorityElement + "_"+ color +".svg";
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


function toggleListTasks(element){
  let list = document.getElementById(element + "_list_task");
    
  if (list.style.display === "none") {
    list.style.display = "block";
  } else {
    list.style.display = "none";
  }
  checkContactList(element);
}


async function checkContactList(element){
  if (element == "contacts"){
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
 * Clears specific input fields and resets the priority to "Medium".
 * After clearing the fields, the function automatically sets the priority button to "default".
 * 
 * @function clearInputs
 * @returns {void} - This function does not return a value.
 */
function clearInputs() {
  const inputIds = ["title", "description", "due_date", "subtasks"];

  inputIds.forEach(id => {
    const element = document.getElementById('id_'+id+'_add_task');
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
  checkPriority("medium");
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

document.getElementById('id_btn_create_task').addEventListener("click", async function(event){
    event.preventDefault();
    await getAddTaskData();
    }
)

 async function getAddTaskData(){
  let titleTask = document.getElementById('id_title_add_task').value;
  let descriptionTask = document.getElementById('id_description_add_task').value;
  let dueDateTask = document.getElementById('id_due_date_add_task').value;
  let priorityTask = getPriority();
  let assignedToTask = getAssignee();
  let categoryTask = getTaskCategory();
  let subtasksTask = getAllSubtasks(); 
  let statusTask = "todo";

  await switchTaskData(titleTask, descriptionTask, dueDateTask, priorityTask,assignedToTask, categoryTask, subtasksTask, statusTask); 
}

function getPriority(){
  return priorities.find(({name}) => {
    const priorityElement = document.getElementById('id_' + name + '_btn');
    return priorityElement?.classList.contains(name +'_btn_filled' );
  }) || null;
}

function getTaskCategory(){
  const categoryElement = document.getElementById('selected_category');
  let categoryContent = categoryElement.textContent;
  return categoryContent;
}

function getAllSubtasks(){
  const subtasks = {};
  document.querySelectorAll('.list_element').forEach(li => {
    let subtaskId = crypto.randomUUID();
    let subtastText = li.querySelector('.subtask_text').textContent.trim();
    
    subtasks[subtaskId]= {
      text: subtastText,
      done: false
    };
  });
  return subtasks;
}

function getAssignee(){
  let selectedAssignees = [];
  document.querySelectorAll('.dropdown_item_user').forEach(listElement =>{
    const validDataChecked = listElement.querySelector('.checkbox_icon');
    if (validDataChecked.dataset.checked === 'true'){
      const name = listElement.querySelector('.user_name_assignee_circle').textContent.trim();
      const initial = listElement.querySelector('.contact_initial_circle').textContent.trim();
      const color = listElement.querySelector('.contact_initial_circle').style.backgroundColor;
    
    selectedAssignees.push({
      name,
      initial,
      color
    })
    }

})
}

async function switchTaskData (titleTask, descriptionTask, dueDateTask, priorityTask,assignedToTask="", categoryTask ="", subtasksTask="", statusTask){
  let taskData = {
    "title": titleTask,
    "description": descriptionTask,
    "dueDate": dueDateTask,
    "priority": priorityTask,
    "assignees": assignedToTask,
    "category": categoryTask,
    "subtasks": subtasksTask,
    "statusTask": statusTask,
  }
 await putToStorage("tasks", taskData);
}

function showContactsInTasks(){
  let assigneeList = document.getElementById('contacts_list_task');
  assigneeList.innerHTML = "";
  for (let index = 0; index < contactsList.length; index++) {
    console.log(contactsList[index]);
    const listElement = document.createElement('li');
    listElement.className = 'dropdown_item';
    listElement.innerHTML = listAssigneeTemplate(contactsList, index);
    assigneeList.appendChild(listElement);
  }
}

