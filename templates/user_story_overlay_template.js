function userStoryTemplate(index, taskList, taskID){
    return `
        <main class="user_story_wrapper" data-task_detail_information-id ="${taskList[index].id}">
            <div class="close_btn_container_user_story">
                <div id="category_label_task_details_${taskList[index].id}" class="story_task_btn">${taskList[index].task.category}</div>
                <img class="close_btn" src="./assets/img/x.svg" alt="Close Button" onclick="closeUserStoryDialog()" role="button" aria-label="Schließen">
            </div>

            <span id="task_detail_title_${taskList[index].id}" class="user_story_title">${taskList[index].task.title}</span>
            <p id="task_detail_description_${taskList[index].id}" class="user_story_description">${taskList[index].task.description}</p>
            
            <table class="recommender_table" aria-label="Page and Recipe Recommender details">
                <tbody>
                    <tr>
                    <th scope="row" class="user_story_description table_spacer">Due Date:</th>
                    <td class="user_story_description table_spacer">${taskList[index].task.dueDate}</td>
                    </tr>
                    <tr>
                    <th scope="row" class="user_story_description table_spacer">Priority:</th>
                    <td class="user_story_description table_spacer icon_gap">${taskList[index].task.priority.name}
                        <img src="./assets/img/prio_${taskList[index].task.priority.name}_${taskList[index].task.priority.color}.svg" alt="Prio Urgent">
                    </td>
                    </tr>
                    <tr>
                    <th scope="row" class="user_story_description table_spacer">Assigned to:</th>
                    </tr>
                </tbody>
            </table>
            <div id= "assignees_task_details_${taskList[index].id}" class="assigned_user">
            </div>

            <p class="user_story_description">Subtasks</p>
            <div id = "subtasks_task_detail_list">
            </div>

            <div class="bottom_area">
                <div class="user_story_btn_area">
                    <button class="delete_edit_btn" onclick="">
                        <img class="icon default" src="./assets/img/delete.svg" alt="Clear Formular">
                        <img class="icon hover" src="./assets/img/delete_blue.svg" alt="Clear Formular Hover">
                        Delete
                    </button>
                    <div class="bottom_divider"></div>
                    <button class="delete_edit_btn" onclick="userStoryEditTemplate()">
                        <img class="icon default" src="./assets/img/edit.svg" alt="Clear Formular">
                        <img class="icon hover" src="./assets/img/edit_blue.svg" alt="Clear Formular Hover">
                        Edit
                    </button>
                </div>
            </div>
        </main>
    `
}

function userStoryEditTemplate(){
    return `

    `
}

function AssigneesTaskDetailsTemplate(assignee){
    return `<div class="contact_initial_circle" style="background-color: ${assignee.assigneeColor};">
                    ${assignee.assigneeInitial} 
                </div>
            <p>${assignee.assigneeName}</p>`
}

function subtaskTaskDetailsTemplate(subtaskID, subtaskContent){
    return` 
        <img id="checkbox_subtask_task_detail_${subtaskID}" onclick="toggleCheckedIcon(this)" class="checkbox_icon" data-checked="${subtaskContent.done}" src="./assets/img/checkbox_unchecked_contact_form.svg" alt="Checkbox Button">
        <p class="user_story_description">${subtaskContent.text}</p>
    `
}   