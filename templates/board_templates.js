function taskListElementTemplate(taskList, index){
    return `
                        <div id="category_label_${taskList[index].id}" class="label_task_card" data-task-id ="${taskList[index].id}">
                            <p class="text_label_task_card">${taskList[index].task.category}</p>
                        </div>
                        <p class="style_text_titel_card" data-task-id ="${taskList[index].id}"> ${taskList[index].task.title}</p>
                        <p data-task-id ="${taskList[index].id}" class="style_text_description_card"  >${taskList[index].task.description}</p>
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
                          <div id ="board_assignee_${taskList[index].id}" class="order_user_icons_task_card">
                          </div>
                          <img id="icon_priority_${taskList[index].id}" src="" alt="">
                        </div>
    `

}