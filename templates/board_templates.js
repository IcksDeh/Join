function taskListElementTemplate(taskID, taskContent){
    return `
                        <div id="category_label_${taskID}" class="label_task_card" data-task-id ="${taskID}">
                            <p class="text_label_task_card">${taskContent.category}</p>
                        </div>
                        <p class="style_text_titel_card" data-task-id ="${taskID}"> ${taskContent.title}</p>
                        <p data-task-id ="${taskID}" class="style_text_description_card"  >${taskContent.description}</p>
                        <div class="order_progressbar_counter">
                          <div class="style_progress_bar"></div>
                          <div class="order_counter_progress">
                            <p>1</p>
                            <p>/</p>
                            <p>2</p>
                            <p>Subtasks</p>                      
                          </div>
                        </div>
                        <div class="order_elements_user_icon_priolable"> 
                          <div id ="board_assignee_${taskID}" class="order_user_icons_task_card">
                          </div>
                          <img id="icon_priority_${taskID}" src="" alt="">
                        </div>
    `

}