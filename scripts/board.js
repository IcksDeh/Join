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
    taskElementofColumnList.className = "style_task_card";
    taskElementofColumnList.dataset
    taskElementofColumnList.innerHTML = taskListElementTemplate(taskID, taskContent);
    taskElementofColumnList.addEventListener('click', function(){
            openUserStoryDialog(taskContent, taskID, index);
        })
    columnElement.appendChild(taskElementofColumnList);
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
        iconPriorityElement.src = "./assets/img/prio_low_green.svg";
    } else if (taskContent.priority.name === "medium"){
        iconPriorityElement.src = "./assets/img/prio_medium_yellow.svg";
    } else{
        iconPriorityElement.src = "./assets/img/prio_urgent_red.svg";
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