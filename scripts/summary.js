async function loadNumberofTasks(){
    await loadFirebaseData('tasks')
    loadSumAllTasks();
    loadSumOfEachTask();
    loadUrgentTasks();
    loadearliestDueDate();
    
}

function loadSumAllTasks(){
    let allTaskSummaryElement = document.getElementById('id_summary_allTasks');
    let sumAllTasks = taskList.length;
    allTaskSummaryElement.innerHTML = sumAllTasks;
}

function loadSumOfEachTask(){
let status = ['todo', 'done', 'inProgress', 'awaitFeedback'];
    console.log(taskList);
    status.forEach(statusElement =>{
        let numberStatusTask = 0;
        taskList.forEach(taskElement => {
            if(statusElement == taskElement.task.statusTask)
            numberStatusTask ++;
        })    
        let taskHTMLElement = document.getElementById('id_summary_'+ statusElement);
        taskHTMLElement.innerHTML = numberStatusTask;
        numberStatusTask = 0;
    })
}

function loadUrgentTasks(){
    let sumUrgentTasks = 0;
    taskList.forEach(taskElement =>{
        if (taskElement.task.priority.name == 'urgent')
            sumUrgentTasks++
    })
    let taskHTMLElement = document.getElementById("id_summary_urgent");
    taskHTMLElement.innerHTML = sumUrgentTasks;
}

function loadearliestDueDate(){
    let dueDateHTMLElement = document.getElementById("id_summary_dueDate");
    let allDueDates = []
    let earliestdueDate = 0;
    taskList.forEach(taskElement =>{
        let urgentTask = taskElement.task.priority.name
        if(urgentTask == "urgent"){
            allDueDates.push(taskElement.task.dueDate);
        }
        let dueDateTask = taskElement.task.dueDate;
    
    })
}