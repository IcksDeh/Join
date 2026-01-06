// USER STORY DIALOG
// PAGE 1


/**
 * Opens the "User Story" dialog if it is not already open and loads the template.
 * setTimeout removes focus from any active element.
 * 
 * @function openUserStoryDialog
 * @returns {void} - This function does not return a value.
 */
function openUserStoryDialog(index, taskList, taskID) {
  const dialog = document.getElementById('userStoryDialog');
    
  if (!dialog.open) {
    dialog.innerHTML = userStoryTemplate(index, taskList, taskID);
    loadAssigneesTaskDetails(taskList, index, taskID);
    loadSubtaksTaskDetails(taskList, index);
    colorLabelTaskDetails (taskList, index, taskID);
    dialog.showModal();

    setTimeout(() => {
      if (document.activeElement) {
        document.activeElement.blur();
      }
    }, 0);
  }
}

function loadAssigneesTaskDetails(taskList, index, taskID){
    let taskAssigneeElement = document.getElementById("assignees_task_details_"+ taskID);
    let assigneeList = taskList[index].task.assignees;
    Object.values(assigneeList)
        .forEach(assignee => {
          console.log(assignee)
        let assigneeHTMLElement = document.createElement('div');
        assigneeHTMLElement.className = "user_info";
        assigneeHTMLElement.innerHTML = AssigneesTaskDetailsTemplate(taskList, index, taskID, assignee);
        taskAssigneeElement.appendChild(assigneeHTMLElement);

    })
  }

function loadSubtaksTaskDetails(taskList, index){
  let subtaskListElement = document.getElementById("subtasks_task_detail_list");
  let subtaskList = taskList[index].task.subtasks;
  Object.entries(subtaskList).forEach(subtaskElement =>{
    console.log(subtaskElement);
    let subtaskID = subtaskElement[0];
    let subtaskContent = subtaskElement[1];
    let subtaskHTMLElement = document.createElement('div');
    subtaskHTMLElement.className = "subtasks_container"
    subtaskHTMLElement.innerHTML = subtaskTaskDetailsTemplate(subtaskID, subtaskContent);
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

function colorLabelTaskDetails (taskList, index, taskID){
  let labelElement = document.getElementById("category_label_task_details_" +taskID)
    if (taskList[index].task.category === "Technical Task"){
        labelElement.style.backgroundColor = '#1FD7C1';
    } else if( taskList[index].task.category === "User Story"){
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
function toggleCheckedIcon(img) {
  const checked = img.dataset.checked === "true";
  img.dataset.checked = !checked;

  img.src = checked
    ? "./assets/img/checkbox_unchecked_contact_form.svg"
    : "./assets/img/checkbox_checked_contact_form.svg";
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