// USER STORY DIALOG
// PAGE 1


/**
 * Opens the "User Story" dialog if it is not already open and loads the template.
 * setTimeout removes focus from any active element.
 * 
 * @function openUserStoryDialog
 * @returns {void} - This function does not return a value.
 */
async function openUserStoryDialog(taskID, taskIndex) {
  await loadFirebaseData("tasks");

  // Hole die aktuelle Task aus taskList anhand der ID
 const currrentTaskElement = taskList.find(taskElement => taskElement.id ===taskID);
  if (!currrentTaskElement) {
    console.error("Task mit ID nicht gefunden:", taskID);
    return;
  }
  const currentTask = currrentTaskElement.task;

  const dialog = document.getElementById('userStoryDialog');
  if (!dialog.open) {
    dialog.innerHTML = userStoryTemplate(currentTask, taskID);
    loadAssigneesTaskDetails(currentTask, taskID);
    loadSubtaksTaskDetails(currentTask, taskID, taskIndex);
    colorLabelTaskDetails(currentTask, taskID);
    dialog.showModal();

    setTimeout(() => {
      if (document.activeElement) {
        document.activeElement.blur();
      }
    }, 0);
  }
}

function loadAssigneesTaskDetails(taskContent, taskID){
    let taskAssigneeElement = document.getElementById("assignees_task_details_"+ taskID);
    let assigneeList = taskContent.assignees;
    Object.values(assigneeList)
        .forEach(assignee => {
          console.log(assignee)
        let assigneeHTMLElement = document.createElement('div');
        assigneeHTMLElement.className = "user_info";
        assigneeHTMLElement.innerHTML = AssigneesTaskDetailsTemplate(assignee);
        taskAssigneeElement.appendChild(assigneeHTMLElement);

    })
  }

function loadSubtaksTaskDetails(taskContent, taskID, taskIndex){
  let subtaskListElement = document.getElementById("subtasks_task_detail_list");
  let subtaskList = taskContent.subtasks;
  Object.entries(subtaskList).forEach(subtaskElement =>{
    console.log(subtaskElement);
    let subtaskID = subtaskElement[0];
    let subtaskContent = subtaskElement[1];
    let subtaskHTMLElement = document.createElement('div');
    subtaskHTMLElement.className = "subtasks_container"
    subtaskHTMLElement.innerHTML = subtaskTaskDetailsTemplate(subtaskID, subtaskContent, taskID, taskIndex);
    subtaskListElement.appendChild(subtaskHTMLElement);
    checkCheckboxSubtaskTaskDetail(subtaskID, subtaskContent);
  })
}

function checkCheckboxSubtaskTaskDetail(subtaskID, subtaskContent){
  let subtaskCheckboxElement = document.getElementById("checkbox_subtask_task_detail_"+ subtaskID);
  if(subtaskContent.done == "false"){
    subtaskCheckboxElement.src = "../assets/img/checkbox_unchecked_contact_form.svg";
  } else {
    subtaskCheckboxElement.src ="../assets/img/checkbox_checked_contact_form.svg";
  }
}

function colorLabelTaskDetails (taskContent, taskID){
  let labelElement = document.getElementById("category_label_task_details_" +taskID)
    if (taskContent.category === "Technical Task"){
        labelElement.style.backgroundColor = '#1FD7C1';
    } else if( taskContent.category === "User Story"){
        labelElement.style.backgroundColor = '#0038FF';
    } else {
        labelElement.style.backgroundColor = '#ff00d9ff';
    }
  }


/**
 * Closes the "User Story" dialog.
 * Removes its content and resets all contact input fields.
 * 
 * @function closeUserStoryDialog
 * @returns {void} - This function does not return a value.
 */
function closeUserStoryDialog() {
  const dialog = document.getElementById('userStoryDialog');
  if (!dialog) return;

  dialog.close();
  dialog.innerHTML = "";

  clearContactInputs();
}


/**
 * Toggles the checked state of a checkbox icon.
 *
 * @param {HTMLImageElement} img
 * The image element representing the checkbox icon.
 * Must contain a 'data-checked' attribute ('true' or 'false').
 */
async function toggleCheckedIcon(img, subtaskId, taskID, taskIndex) {
  const checked = img.dataset.checked === "true";
  img.dataset.checked = !checked;

  img.src = checked
    ? "./assets/img/checkbox_unchecked_contact_form.svg"
    : "./assets/img/checkbox_checked_contact_form.svg";

  await updateSubtaskStatus(subtaskId, taskID, !checked, taskIndex);
  await loadFirebaseData("tasks");
  loadSummarySubtasks(taskID, taskIndex);
  loadCounterDoneSubtasks(taskID, taskIndex);
}


// USER STORY EDIT DIALOG
// PAGE 2


/**
 * Opens the "User Story" dialog if it is not already open and loads the template.
 * setTimeout removes focus from any active element.
 * 
 * @function openUserStoryEditDialog
 * @returns {void} - This function does not return a value.
 */
function openUserStoryEditDialog() {
  const dialog = document.getElementById('userStoryEditDialog');
    
  if (!dialog.open) {
    dialog.innerHTML = userStoryEditTemplate();
    dialog.showModal();

    setTimeout(() => {
      if (document.activeElement) {
        document.activeElement.blur();
      }
    }, 0);
  }
}


/**
 * Closes the "User Story" dialog.
 * Removes its content and resets all contact input fields.
 * 
 * @function closeUserStoryEditDialog
 * @returns {void} - This function does not return a value.
 */
function closeUserStoryEditDialog() {
  const dialog = document.getElementById('userStoryEditDialog');
  if (!dialog) return;

  dialog.close();
  dialog.innerHTML = "";

  clearInputs();
}

function deleteTask(taskID){
  Object.values(taskList).forEach(taskElement =>{
    console.log(taskElement.id);
    if(taskElement.id == taskID){
      deleteTaskFromFirebase(taskID, "tasks/");
    }
  })
}