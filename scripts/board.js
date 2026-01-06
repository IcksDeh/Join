async function loadContentBoard(){
    await loadFirebaseData('tasks');
    loadTaskTickets();
}

function loadTaskTickets(){
    let taskTodo = document.getElementById('board_column_todo');
    // filter einbauen, dass Element nur gelehrt wird, wenn Tickets vorhanden sind
    taskTodo.innerHTML = "";
    taskTodo.classList.remove("no_task_available");
    for (let index = 0; index < taskList.length; index++){       
        let taskElement = document.createElement('div');
        let taskID = taskList[index].id
        taskElement.className = "style_task_card";
        taskElement.dataset
        taskElement.innerHTML = taskListElementTemplate(taskList, index);
        taskElement.addEventListener('click', function(){
            openUserStoryDialog(index, taskList, taskID);
        })
        taskTodo.appendChild(taskElement);
        loadAssigneesOfTaks(taskList, index, taskID);
        loadPriorityIcon(taskList, index, taskID);
        loadCategoryLabelColor(taskList, index, taskID)
    }
}

function loadAssigneesOfTaks(taskList, index, taskID){
    let taskAssigneeElement = document.getElementById("board_assignee_"+ taskID);
    let assigneeList = taskList[index].task.assignees;
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

function loadPriorityIcon(taskList, index, taskID){
    let iconPriorityElement = document.getElementById("icon_priority_"+taskID);
    if (taskList[index].task.priority.name === "low"){
        iconPriorityElement.src = "./assets/img/prio_low_green.svg";
    } else if (taskList[index].task.priority.name === "medium"){
        iconPriorityElement.src = "./assets/img/prio_medium_yellow.svg";
    } else{
        iconPriorityElement.src = "./assets/img/prio_urgent_red.svg";
    }
}

function loadCategoryLabelColor(taskList, index, taskID){
    let categoryLabel = document.getElementById("category_label_"+taskID);
    if (taskList[index].task.category === "Technical Task"){
        categoryLabel.style.backgroundColor = '#1FD7C1';
    } else if( taskList[index].task.category === "User Story"){
        categoryLabel.style.backgroundColor = '#0038FF';
    } else {
        categoryLabel.style.backgroundColor = '#ff00d9ff';
    }
}