//TASK

async function getAddTaskData(status = "todo") {
  let titleTask = document.getElementById('id_title_add_task').value;
  let descriptionTask = document.getElementById('id_description_add_task').value;
  let dueDateTask = document.getElementById('id_due_date_add_task').value;
  let priorityTask = getPriority();
  let assignedToTask = getAssignee();
  let categoryTask = getTaskCategory();
  let subtasksTask = getAllSubtasks();
  let statusTask = status;

  await switchTaskData(titleTask, descriptionTask, dueDateTask, priorityTask, assignedToTask, categoryTask, subtasksTask, statusTask);
}

function getPriority() {
  return priorities.find(({ name }) => {
    const priorityElement = document.getElementById('id_' + name + '_btn');
    return priorityElement?.classList.contains(name + '_btn_filled');
  }) || null;
}

function getTaskCategory() {
  const categoryElement = document.getElementById('selected_category');
  let categoryContent = categoryElement.textContent;
  return categoryContent;
}

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

async function switchTaskData(titleTask = "", descriptionTask = "", dueDateTask = "", priorityTask = "", assignedToTask = "", categoryTask = "", subtasksTask = "", statusTask = "") {
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

//Contacts

function getElementsContacts() {
  return {
    name: document.getElementById('id_contact_name'),
    email: document.getElementById('id_contact_email'),
    phonenumber: document.getElementById('id_contact_phone'),
  };
}

async function getContactData() {
  const elements = getElementsContacts();
  let contactName = elements.name.value;
  let contactEmail = elements.email.value;
  let contactPhonenumber = elements.phonenumber.value;
  let contactColor = getRandomColor();
  let contactInitals = getContactInitials(contactName);

  await switchContactsData(contactName, contactEmail, contactColor, contactInitals, elements, contactPhonenumber,)
}

function getContactInitials(contactName) {
  let contactInitials = contactName.split(" ").map(word => word[0]).join("").toUpperCase();
  return contactInitials;
}

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