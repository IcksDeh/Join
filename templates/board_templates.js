function taskListElementTemplate(taskID, index) {
  return `
    <div class="style_task_card" onclick="openTaskDetailDialog('${taskID}', '${index}')" draggable="true" ondragstart="startDragging(event, ${index}, '${taskID}')" ondragend="stopDragging(event)" >
      <div id="category_label_${taskID}" class="label_task_card" data-task-id="${taskID}">
        <p class="text_label_task_card">${taskList[index].task.category}</p>
      </div>
      <p class="style_text_titel_card" data-task-id="${taskID}"> ${taskList[index].task.title}</p>
      <p data-task-id="${taskID}" class="style_text_description_card">${taskList[index].task.description}</p>
      <div class="order_progressbar_counter">
        <div class="style_progress_bar">
          <div id="progressbar_${taskID}" class="progressbar_filled" style="width: 0%;"></div>
        </div>
        <div class="order_counter_progress">
        <p id="counterDoneSubtasks_${taskID}")></p>
        <p>/</p>
        <p id="counterAllSubtasks_${taskID}"></p>
        <p>&nbsp;Subtasks</p>                      
        </div>
        </div>
        <div class="order_elements_user_icon_priolable"> 
          <div id="board_assignee_${taskID}" class="order_user_icons_task_card">
          </div>
          <img id="icon_priority_${taskID}" src="" alt="">
      </div>
    </div>
  `;
}