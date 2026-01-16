/**
 * Loads the entire content board.
 * Clears the board, fetches the latest tasks from Firebase, and populates each column based on task status.
 */
async function loadContentBoard() {
    resetBoardHTML(); 
    await loadFirebaseData('tasks');
    checkStatusTask();
}


/**
 * Iterates through all tasks and calls loadBoardColumn to place each task in the correct column based on its status.
 */
function checkStatusTask(){
    Object.entries(taskList).forEach((taskElementofColumn, index) =>{
        taskID = taskElementofColumn[1].id;
        taskContent = taskElementofColumn[1].task;
        if(taskContent.statusTask =="todo"){
            loadBoardColumn(taskID, taskContent, index, "todo");
        } else if (taskContent.statusTask =="inProgress"){
            loadBoardColumn(taskID, taskContent, index, "inProgress");
        } else if (taskContent.statusTask =="awaitFeedback"){
            loadBoardColumn(taskID, taskContent, index, "awaitFeedback");
        } else if (taskContent.statusTask =="done"){
            loadBoardColumn(taskID, taskContent, index, "done");
        }
    })
}


/**
 * Loads a specific task into its corresponding column.
 * Initializes the column if it's not yet initialized, then renders task content, assignees, priority icon, category label, and progress bar.
 *
 * @param {string} taskID - The unique ID of the task.
 * @param {Object} taskContent - The task data object.
 * @param {number} index - Index of the task in taskList.
 * @param {string} status - The status of the column.
 */
function loadBoardColumn(taskID, taskContent, index, status){
    let columnElement = document.getElementById('board_column_' +status);

    if (columnElement.dataset.initialized == "false"){
        columnElement.innerHTML = "";
        columnElement.classList.remove("no_task_available");  
        columnElement.dataset.initialized = "true"; 
    }
    loadTaskElementinColumn(taskID, taskContent, index, status);
    loadAssigneesOfTaks(taskContent, taskID);
    loadPriorityIcon(taskContent, taskID);
    loadCategoryLabelColor(taskContent, taskID);
    loadProgressbar(index, taskID);
}


/**
 * Creates a task element and appends it to the corresponding column.
 * Also loads the subtasks summary and the done subtasks counter.
 *
 * @param {string} taskID - The unique ID of the task.
 * @param {Object} taskContent - The task data object.
 * @param {number} index - Index of the task in the task list.
 * @param {string} status - The status of the column.
 */
function loadTaskElementinColumn(taskID, taskContent, index, status){
    let columnElement = document.getElementById('board_column_' +status);
    let taskElementofColumnList = document.createElement('div');
    taskElementofColumnList.innerHTML = taskListElementTemplate(taskID, index);
    columnElement.appendChild(taskElementofColumnList);
    loadSummarySubtasks(taskID, index);
    loadCounterDoneSubtasks(taskID, index);
}


/**
 * Main function to load assignees.
 * Coordinates the rendering of visible avatars and the overflow counter.
 */
function loadAssigneesOfTaks(taskContent, taskID) {
    let taskAssigneeElement = document.getElementById("board_assignee_" + taskID);
    taskAssigneeElement.innerHTML = ""; 

    let assigneeList = Object.values(taskContent.assignees || {});
    let maxVisible = 2;

    renderVisibleAssignees(assigneeList, maxVisible, taskAssigneeElement);
    renderOverflowCounter(assigneeList.length, maxVisible, taskAssigneeElement);
}


/**
 * Renders the visible assignee avatars (up to maxVisible).
 *
 * @param {Array} assigneeList - Array of assignee objects.
 * @param {number} maxVisible - Maximum number of avatars to show.
 * @param {HTMLElement} container - The DOM element to append to.
 */
function renderVisibleAssignees(assigneeList, maxVisible, container) {
    let countToRender = Math.min(assigneeList.length, maxVisible);

    for (let i = 0; i < countToRender; i++) {
        let assignee = assigneeList[i];
        let avatar = document.createElement('div');
        avatar.className = "user_circle_task_card";
        avatar.style.backgroundColor = assignee.assigneeColor;
        avatar.innerHTML = assignee.assigneeInitial;
        container.appendChild(avatar);
    }
}


/**
 * Renders the overflow counter (e.g., "+2") if there are more assignees than maxVisible.
 *
 * @param {number} totalAssignees - Total count of assignees.
 * @param {number} maxVisible - Limit before overflow triggers.
 * @param {HTMLElement} container - The DOM element to append to.
 */
function renderOverflowCounter(totalAssignees, maxVisible, container) {
    if (totalAssignees > maxVisible) {
        let remaining = totalAssignees - maxVisible;
        let overflowCircle = document.createElement('div');
        
        overflowCircle.className = "user_circle_task_card";
        overflowCircle.style.backgroundColor ="#29abe2"  
        overflowCircle.style.color = 'white';
        overflowCircle.innerHTML = `+${remaining}`;
        
        container.appendChild(overflowCircle);
    }
}


/**
 * Sets the priority icon for a task based on its priority level.
 *
 * @param {Object} taskContent - The task data object containing priority information.
 * @param {string} taskID - The unique ID of the task.
 */
function loadPriorityIcon(taskContent, taskID){
    let iconPriorityElement = document.getElementById("icon_priority_"+taskID);
    if (taskContent.priority.name === "low"){
        iconPriorityElement.src = "../assets/img/prio_low_green.svg";
    } else if (taskContent.priority.name === "medium"){
        iconPriorityElement.src = "../assets/img/prio_medium_yellow.svg";
    } else{
        iconPriorityElement.src = "../assets/img/prio_urgent_red.svg";
    }
}


/**
 * Sets the background color of a task's category label based on its category.
 *
 * @param {Object} taskContent - The task data object containing category information.
 * @param {string} taskID - The unique ID of the task.
 */
function loadCategoryLabelColor(taskContent, taskID){
    let categoryLabel = document.getElementById("category_label_"+taskID);
    if (taskContent.category === "Technical Task"){
        categoryLabel.style.backgroundColor = '#1FD7C1';
    } else if(taskContent.category === "User Story"){
        categoryLabel.style.backgroundColor = '#0038FF';
    } else {
        categoryLabel.style.backgroundColor = '#ff5eb3';
    }
}


/**
 * Updates the total number of subtasks for a task and displays it in the corresponding element.
 *
 * @param {string} taskID - The unique ID of the task.
 */
function loadSummarySubtasks(taskID, index){
    const currrentTaskElement = taskList.find(taskElement => taskElement.id ===taskID);
    if (!currrentTaskElement) {
        console.error("Task mit ID nicht gefunden:", taskID);
        return;
    }
    const currentTask = currrentTaskElement.task;
    const elementAllSubtasks = document.getElementById("counterAllSubtasks_"+ taskID);
    let elementSubtasks = currentTask.subtasks;
    let counterAllSubtaks = 0
    Object.entries(elementSubtasks).forEach(eachElement => {
        counterAllSubtaks ++;
    })
    elementAllSubtasks.innerHTML = counterAllSubtaks;
}


/**
 * Updates the number of completed subtasks for a task and displays it in the corresponding element.
 *
 * @param {string} taskID - The unique ID of the task.
 */
function loadCounterDoneSubtasks(taskID, index){
    const currrentTaskElement = taskList.find(taskElement => taskElement.id ===taskID);
    if (!currrentTaskElement) {
        console.error("Task mit ID nicht gefunden:", taskID);
        return;
    }
    const currentTask = currrentTaskElement.task;
    const elementAllSubtasks = document.getElementById("counterDoneSubtasks_"+ taskID);
    let elementSubtasks = currentTask.subtasks;
    let counterDoneSubtasks = 0;
    Object.values(elementSubtasks).forEach(eachElement => {
        if(eachElement.done == true){
            counterDoneSubtasks ++;
        }
    })
    elementAllSubtasks.innerHTML = counterDoneSubtasks;
}


/**
 * Sets the currently dragged task.
 *
 * @param {number} index - The index of the task in the task list.
 * @param {string} taskID - The unique ID of the task being dragged.
 */
function startDragging(index, taskID){
    currentDraggedElementIndex = index;
    currentDraggedElementID = taskID;
}


/**
 * Allows dropping an element on a drop target by preventing the default behavior.
 *
 * @param {DragEvent} event - The dragover event triggered on the drop target.
 */
function allowDrop(event){
    event.preventDefault();
}


/**
 * Handles dropping a task onto a category column.
 * Updates the task's status and reloads the content board.
 *
 * @async
 * @param {string} category - The target category/status where the task is dropped.
 */
async function drop(category){
    await updateTaskStatus(category);
    await loadContentBoard();
}


/**
 * Loads the progress bar for a specific task by calculating the percentage of completed subtasks and updating the corresponding progress bar element.
 *
 * @async
 * @param {number} index - The index of the task in the task list.
 * @param {string} taskID - The unique ID of the task, used to find the progress bar element.
 */
async function loadProgressbar(index, taskID){
    await loadFirebaseData('tasks');
        
    let progressbarElement = document.getElementById('progressbar_'+ taskID);
    let sumAllSubtasks = numberAllSubtasks(index);
    let sumDoneSubtasks = numberDoneSubstask(index);
    let calculatesSubtaksProgress = sumDoneSubtasks / sumAllSubtasks;
    let progressPercent = Math.round(calculatesSubtaksProgress * 100);
    progressbarElement.style.width = progressPercent + '%';
    
}


/**
 * Counts the total number of subtasks for a given task.
 *
 * @param {number} index - The index of the task in the task list.
 * @returns {number} - The total number of subtasks.
 */
function numberAllSubtasks(index){
    let numberAllSubtasks = 0;
    let taskElement = taskList[index].task.subtasks;
    Object.keys(taskElement).forEach(element =>{
        numberAllSubtasks ++;
    })
    return numberAllSubtasks;
}


/**
 * Counts the number of completed subtasks for a given task.
 *
 * @param {number} index - The index of the task in the task list.
 * @returns {number} - The number of completed subtasks.
 */
function numberDoneSubstask(index){
    let doneSubtasks = 0;
    let taskElement = taskList[index].task.subtasks;
    Object.values(taskElement).forEach(element =>{
        if(element.done == true){
            doneSubtasks ++;
        }
    })
    return doneSubtasks;
}


/**
 * Filters tasks based on the search query in the title or description.
 * Shows "Keine Ergebnisse gefunden" if search yields no hits in a column.
 */
function filterTasks() {
    let searchInput = document.querySelector('.style_input_searchbar');
    let searchTerm = searchInput.value.toLowerCase();
    let placeholderMessage = searchTerm.length > 0 ? "No results found" : null;
    resetBoardHTML(placeholderMessage);

    taskList.forEach((taskItem, index) => {
        let taskContent = taskItem.task;
        let taskID = taskItem.id;
        
        let title = taskContent.title.toLowerCase();
        let description = taskContent.description.toLowerCase();
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            loadBoardColumn(taskID, taskContent, index, taskContent.statusTask);
        }
    });
}


/**
 * Resets the HTML of all board columns.
 * @param {string|null} customMessage
 */
function resetBoardHTML(customMessage = null) {
    const columns = [
        { id: 'todo', text: 'To Do' },
        { id: 'inProgress', text: 'Progress' },
        { id: 'awaitFeedback', text: 'Await Feedback' },
        { id: 'done', text: 'Done' }
    ];
    columns.forEach(col => {
        let columnElement = document.getElementById('board_column_' + col.id);
        let message = customMessage ? customMessage : `No tasks in ${col.text}`;

        columnElement.innerHTML = `<div class="no_task_message">${message}</div>`;
        columnElement.classList.add("no_task_available");
        columnElement.dataset.initialized = "false";
    });
}


/**
 * Checks if the "Add Task" dialog is currently visible and if the screen width is less than 700 pixels.
 * If both conditions are met, it redirects the user to the "add_task.html" page.
 * This function is triggered on page load and window resize.
 *
 * @function
 */
function checkOverlayRedirect() {
    const overlay = document.getElementById('addTaskDialog');
    
    if (!overlay) return;
    const style = window.getComputedStyle(overlay);
    if (style.display === 'none' || style.visibility === 'hidden') return;

    if (window.innerWidth < 700) {
        window.location.href = "add_task.html";
    }
}
window.addEventListener('load', checkOverlayRedirect);
window.addEventListener('resize', checkOverlayRedirect);