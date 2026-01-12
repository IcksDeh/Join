async function loadContentBoard(){
    const columns = ['todo', 'inProgress', 'awaitFeedback', 'done'];
    columns.forEach(status => {
    const column = document.getElementById('board_column_' + status);
    if (column) {
        column.dataset.initialized = "false";
    }
    });
    await loadFirebaseData('tasks');
    // loadTaskTickets();
    checkStatusTask();
}

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

function loadTaskElementinColumn(taskID, taskContent, index, status){
    let columnElement = document.getElementById('board_column_' +status);
    let taskElementofColumnList = document.createElement('div');
    taskElementofColumnList.innerHTML = taskListElementTemplate(taskID, index);
    columnElement.appendChild(taskElementofColumnList);
    loadSummarySubtasks(taskID, index);
    loadCounterDoneSubtasks(taskID, index);
}

function loadAssigneesOfTaks(taskContent, taskID){
    let taskAssigneeElement = document.getElementById("board_assignee_"+ taskID);
    let assigneeList = taskContent.assignees;
    Object.values(assigneeList)
        .slice(0,5)
        .forEach(assignee => {
        let assigneeHTMLElement = document.createElement('div');
        assigneeHTMLElement.className = "user_circle_task_card";
        assigneeHTMLElement.style.backgroundColor = assignee.assigneeColor;
        assigneeHTMLElement.innerHTML = assignee.assigneeInitial;
        taskAssigneeElement.appendChild(assigneeHTMLElement);

    }) 
}

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

function loadCategoryLabelColor(taskContent, taskID){
    let categoryLabel = document.getElementById("category_label_"+taskID);
    if (taskContent.category === "Technical Task"){
        categoryLabel.style.backgroundColor = '#1FD7C1';
    } else if(taskContent.category === "User Story"){
        categoryLabel.style.backgroundColor = '#0038FF';
    } else {
        categoryLabel.style.backgroundColor = '#ff00d9ff';
    }
}

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

function startDragging(index, taskID){
    currentDraggedElementIndex = index;
    currentDraggedElementID = taskID;

}

function allowDrop(event){
    event.preventDefault();
}

async function drop(category){
    await updateTaskStatus(category);
    await loadContentBoard();
}

async function loadProgressbar(index, taskID){
    await loadFirebaseData('tasks');
        
    let progressbarElement = document.getElementById('progressbar_'+ taskID);
    let sumAllSubtasks = numberAllSubtasks(index);
    let sumDoneSubtasks = numberDoneSubstask(index);
    let calculatesSubtaksProgress = sumDoneSubtasks / sumAllSubtasks;
    let progressPercent = Math.round(calculatesSubtaksProgress * 100);
    progressbarElement.style.width = progressPercent + '%';
    
}

function numberAllSubtasks(index){
    let numberAllSubtasks = 0;
    let taskElement = taskList[index].task.subtasks;
    Object.keys(taskElement).forEach(element =>{
        numberAllSubtasks ++;
    })
    return numberAllSubtasks;
}

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
 * Triggered by the onkeyup event in the search input field.
 */
function filterTasks() {
    let searchInput = document.querySelector('.style_input_searchbar');
    let searchTerm = searchInput.value.toLowerCase();
    
    resetBoardHTML();
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
 * Resets the HTML of all board columns to the default state.
 * Re-inserts the placeholder texts and resets the data-initialized attribute.
 */
function resetBoardHTML() {
    const columns = [
        { id: 'todo', text: 'To Do' },
        { id: 'inProgress', text: 'Progress' },
        { id: 'awaitFeedback', text: 'Await Feedback' },
        { id: 'done', text: 'Done' }
    ];

    columns.forEach(col => {
        let columnElement = document.getElementById('board_column_' + col.id);
        columnElement.innerHTML = `<p>No tasks in ${col.text}</p>`;
        columnElement.classList.add("no_task_available");
        columnElement.dataset.initialized = "false";
    });
}