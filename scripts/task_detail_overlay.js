// USER STORY DIALOG
// PAGE 1


/**
 * Opens the "Task Detail" dialog if it is not already open and loads the template.
 * setTimeout removes focus from any active element.
 * 
 * @function openTaskDetailDialog
 * @returns {void} - This function does not return a value.
 */
async function openTaskDetailDialog(taskID, taskIndex) {
  await loadFirebaseData("tasks");

 const currrentTaskElement = taskList.find(taskElement => taskElement.id ===taskID);
  if (!currrentTaskElement) {
    console.error("Task mit ID nicht gefunden:", taskID);
    return;
  }
  const currentTask = currrentTaskElement.task;

  const dialog = document.getElementById('taskDetailDialog');
  if (!dialog.open) {
    dialog.innerHTML = taskDetailTemplate(currentTask, taskID);
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
 * @function closeTaskDetailDialog
 * @returns {void} - This function does not return a value.
 */
function closeTaskDetailDialog() {
  const dialog = document.getElementById('taskDetailDialog');
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
async function toggleCheckedIconSubtasks(img, subtaskId, taskID, taskIndex) {
  const checked = img.dataset.checked === "true";
  img.dataset.checked = !checked;

  img.src = checked
    ? "./assets/img/checkbox_unchecked_contact_form.svg"
    : "./assets/img/checkbox_checked_contact_form.svg";

  await updateSubtaskStatus(subtaskId, taskID, !checked, taskIndex);
  await loadFirebaseData("tasks");
  loadSummarySubtasks(taskID, taskIndex);
  loadCounterDoneSubtasks(taskID, taskIndex);
  loadProgressbar(taskIndex, taskID);
}


// USER STORY EDIT DIALOG
// PAGE 2


/**
 * Opens the "User Story" dialog if it is not already open and loads the template.
 * setTimeout removes focus from any active element.
 * 
 * @function openTaskDetailEditDialog
 * @returns {void} - This function does not return a value.
 */
function openTaskDetailEditDialog() {
  const dialog = document.getElementById('taskDetailEditDialog');
    
  if (!dialog.open) {
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
 * @function closeTaskDetailEditDialog
 * @returns {void} - This function does not return a value.
 */
function closeTaskDetailEditDialog() {
  const dialog = document.getElementById('taskDetailEditDialog');
  if (!dialog) return;

  dialog.close();
  dialog.innerHTML = "";

  clearInputs();
}


/**
 * Deletes a task with the given ID from Firebase if it exists in the task list.
 * Iterates over all tasks in `taskList` and calls `deleteTaskFromFirebase` when a task with a matching ID is found.
 *
 * @param {string|number} taskID - The ID of the task to delete.
 */
function deleteTask(taskID){
  Object.values(taskList).forEach(taskElement =>{
    console.log(taskElement.id);
    if(taskElement.id == taskID){
      deleteTaskFromFirebase(taskID, "tasks/");
    }
  })
}