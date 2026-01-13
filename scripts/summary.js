async function loadNumberofTasks(){
    await loadFirebaseData('tasks')
    loadSumAllTasks();
    loadSumOfEachTask();
    loadUrgentTasks();
    loadEarliestDueDate();
    
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

function loadEarliestDueDate(){
    let dueDateHTMLElement = document.getElementById("id_summary_dueDate");
    let now = new Date();
    let urgentDueDates = taskList
        .filter(taskElement => taskElement.task.priority.name === "urgent" && new Date(taskElement.task.dueDate) >= now)
        .map(taskElement => new Date(taskElement.task.dueDate));
      if (urgentDueDates.length === 0) {
        dueDateHTMLElement.textContent = "No Urgent Task available";
        return;
    }
    const earliestDueDate = urgentDueDates.reduce((closest, current) => {
        return Math.abs(current - now) < Math.abs(closest - now)
            ? current
            : closest;
    });
    dueDateHTMLElement.innerHTML =earliestDueDate.toISOString().split("T")[0];
}