//TASK
/**
 * Gathers data from the "Add Task" form and prepares it for storage.
 * @param {string} status - The status of the task (default is "todo"). */

async function getAddTaskData(status = "todo", HTMLid) {
  let titleTask = document.getElementById('id_title_add_task_' + HTMLid).value;
  let descriptionTask = document.getElementById('id_description_add_task_' + HTMLid).value;
  let dueDateTask = document.getElementById('id_due_date_add_task_'+ HTMLid).value;
  let priorityTask = getPriority(HTMLid);
  let assignedToTask = getAssignee();
  let categoryTask = getTaskCategory(HTMLid);
  let subtasksTask = getAllSubtasks();
  let statusTask = status;

  await switchTaskData(titleTask, descriptionTask, dueDateTask, priorityTask, assignedToTask, categoryTask, subtasksTask, statusTask, HTMLid);
}
/**
 * Retrieves the selected priority from the task form based on the provided HTML ID.
 * @param {string} HTMLid - The HTML ID suffix used to identify the priority buttons.
 * @returns {Object|null} The priority object if found, otherwise null.*/

function getPriority(HTMLid) {
  return priorities.find(({ name }) => {
    const priorityElement = document.getElementById('id_' + name + '_btn_'+ HTMLid);
    return priorityElement?.classList.contains(name + '_btn_filled');
  }) || null;
}

/** Retrieves the selected task category from the task form based on the provided HTML ID.
 * @param {string} HTMLid - The HTML ID suffix used to identify the category element.
 * @returns {string} The selected category content. */

function getTaskCategory(HTMLid) {
  const categoryElement = document.getElementById('selected_category_'+HTMLid);
  let categoryContent = categoryElement.textContent;
  return categoryContent;
}

/** Gathers all subtasks from the task form.
 * @returns {Object|string} An object containing subtasks if any exist, otherwise an empty string. */

function getAllSubtasks() {
  let subtasks = {};
  document.querySelectorAll('.list_element').forEach(li => {
    let subtaskId = crypto.randomUUID();
    let subtastText = li.querySelector('.subtask_text').textContent.trim();

    subtasks[subtaskId] = {
      text: subtastText,
      done: false
    };
  });
  if (Object.keys(subtasks).length === 0) {
    subtasks = "";
    return subtasks;
  } else {
    return subtasks;
  }
}

/** Gathers selected assignees from the task form.
 * @returns {Object|string} An object containing selected assignees if any exist, otherwise an empty string. */

function getAssignee() {
  let selectedAssignees = {};
  document.querySelectorAll('.dropdown_item_user').forEach(listElement => {
    const validDataChecked = listElement.querySelector('.checkbox_icon');
    if (validDataChecked.dataset.checked === 'true') {
      const name = listElement.querySelector('.user_name_assignee_circle').textContent.trim();
      const initial = listElement.querySelector('.contact_initial_circle').textContent.trim();
      const color = listElement.querySelector('.contact_initial_circle').style.backgroundColor;
      const id = listElement.dataset.assigneeId;

      selectedAssignees[id] = {
        assigneeName: name,
        assigneeInitial: initial,
        assigneeColor: color,
      }
    }
  })
  if (Object.keys(selectedAssignees).length === 0) {
    selectedAssignees = "";
    return selectedAssignees;
  } else {
    return selectedAssignees;
  }
}

//TASK SWITCH DATA
/** Updates or creates task data in storage.
 * @param {string} titleTask - The title of the task.
 * @param {string} descriptionTask - The description of the task. */

async function switchTaskData(titleTask = "", descriptionTask = "", dueDateTask = "", priorityTask = "", assignedToTask = "", categoryTask = "", subtasksTask = "", statusTask = "", HTMLid) {
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
  await putToStorage("tasks", taskData,elements ='', HTMLid);
}

//Contacts
/** Retrieves the input elements for contact data.
 * @returns {Object} An object containing references to the name, email, and phone number input elements. */

function getElementsContacts() {
  return {
    name: document.getElementById('id_contact_name'),
    email: document.getElementById('id_contact_email'),
    phonenumber: document.getElementById('id_contact_phone'),
  };
}

/** Gathers data from the "Add Contact" form and prepares it for storage. */
async function getContactData() {
  const elements = getElementsContacts();
  let contactName = elements.name.value;
  let contactEmail = elements.email.value;
  let contactPhonenumber = elements.phonenumber.value;
  let contactColor = getRandomColor();
  let contactInitals = getContactInitials(contactName);

  await switchContactsData(contactName, contactEmail, contactColor, contactInitals, elements, contactPhonenumber,)
}

//TASK EDIT
/** Gathers data from the "Edit Task" form and prepares it for storage.
 * @param {string} taskID - The unique identifier of the task to be edited. */

async function saveChangesTask(taskID,  index, HTMLid){
  let titleTask = document.getElementById('id_title_task_detail_edit').value;
  let descriptionTask = document.getElementById('id_description_task_detail_edit').value;
  let dueDateTask = document.getElementById('id_due_date_task_detail_edit').value;
  let priorityTask = getPriority(HTMLid);
  let assignedToTask = getAssignee();
  let categoryTask = taskList[index].task.category;
  let subtasksTask = getSubtaskEditTask();
  let statusTask = taskList[index].task.statusTask;

await switchTaskEditData(titleTask, descriptionTask, dueDateTask, priorityTask, assignedToTask, categoryTask, subtasksTask, statusTask, HTMLid);
}

function getSubtaskEditTask(){
  let subtasks = {};
    document.querySelectorAll('.list_element').forEach(li => {
      const subtaskText = li.querySelector('.subtask_text').textContent.trim();
      const datasetSubtaskID = li.dataset.subtaskId;
      const datasetSubtaskStatus = li.dataset.subtaskStatus;
      
      if(datasetSubtaskID){
        
        subtasks[datasetSubtaskID] = {
          text: subtaskText,
          done: datasetSubtaskStatus === "true",
        };        
      } else { 
        let subtaskId = crypto.randomUUID();
        subtasks[subtaskId] = {
        text: subtaskText,
        done: false
      };
      }  
    });
    if (Object.keys(subtasks).length === 0) {
      subtasks = "";
      return subtasks;
    } else {
      return subtasks;
    }
  }


/** Extracts initials from a contact's name.
 * @param {string} contactName - The full name of the contact.
 * @returns {string} The initials of the contact in uppercase. */

function getContactInitials(contactName) {
  let contactInitials = contactName.split(" ").map(word => word[0]).join("").toUpperCase();
  return contactInitials;
}

//CONTACTS SWITCH DATA
/** Updates or creates contact data in storage.
 * @param {string} contactName - The name of the contact.
 * @param {string} contactEmail - The email of the contact.
 * @param {string} contactColor - The color associated with the contact.
 * @param {string} contactInitals - The initials of the contact.
 * @param {Object} elements - Optional elements related to the contact.
 * @param {string} contactPhonenumber - The phone number of the contact. */

async function switchContactsData(contactName, contactEmail, contactColor, contactInitals, elements = "", contactPhonenumber = "") {
  let contactData = {
    "name": contactName,
    "eMail": contactEmail,
    "phoneNumber": contactPhonenumber,
    "color": contactColor,
    "initial": contactInitals,
  }
  await putToStorage("contacts", contactData, elements)
}

//USER
/** Gathers data from the "User" form and prepares it for storage. */

async function getUserData() {
  const elements = getElementsUser();

  let userName = elements.name.value;
  let userEmail = elements.email.value;
  let userPassword = elements.pass.value;
  let userColor = getRandomColor();
  let userInitials = getContactInitials(userName)
  await switchUserData(userName, userEmail, userColor, elements, userPassword, userInitials);
  await switchContactsData(userName, userEmail, userColor, userInitials);
}