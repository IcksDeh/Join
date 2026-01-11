async function loadContentBoard(){
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
}