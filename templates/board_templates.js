function taskListElementTemplate(taskID, index) {
  return `
  <div class = "style_task_card" onclick = "openUserStoryDialog('${taskID}', '${index}')" draggable  = "true" ondragstart = "startDragging('${index}','${taskID}')">
    <div id="category_label_${taskID}" class="label_task_card" data-task-id ="${taskID}">
      <p class="text_label_task_card">${taskList[index].task.category}</p>
    </div>
    <p class="style_text_titel_card" data-task-id ="${taskID}"> ${taskList[index].task.title}</p>
    <p data-task-id ="${taskID}" class="style_text_description_card"  >${taskList[index].task.description}</p>
    <div class="order_progressbar_counter">
      <div class="style_progress_bar"></div>
      <div class="order_counter_progress">
      <p id="counterDoneSubtasks_${taskID}")></p>
      <p>/</p>
      <p id="counterAllSubtasks_${taskID}"></p>
      <p>Subtasks</p>                      
      </div>
      </div>
      <div class="order_elements_user_icon_priolable"> 
        <div id ="board_assignee_${taskID}" class="order_user_icons_task_card">
        </div>
        <img id="icon_priority_${taskID}" src="" alt="">
      </div>
  </div>
    `;
}

// Löschen, wenn es mit oben FUnktion funktioniert. (BACK_UP) (Erst am Ende löschen, wenn alle Funktionen nochmal getestet wurden)

// function taskListElementTemplate(taskID, taskContent, index) {
//   return `
//   <div class = "style_task_card" onclick = openUserStoryDialog("${taskContent}", "${taskID}", "${index}") draggable  = "true" ondragstart = startDragging()>
//     <div id="category_label_${taskID}" class="label_task_card" data-task-id ="${taskID}">
//       <p class="text_label_task_card">${taskContent.category}</p>
//     </div>
//     <p class="style_text_titel_card" data-task-id ="${taskID}"> ${taskContent.title}</p>
//     <p data-task-id ="${taskID}" class="style_text_description_card"  >${taskContent.description}</p>
//     <div class="order_progressbar_counter">
//       <div class="style_progress_bar"></div>
//       <div class="order_counter_progress">
//       <p id="counterDoneSubtasks_${taskID}")></p>
//       <p>/</p>
//       <p id="counterAllSubtasks_${taskID}"></p>
//       <p>Subtasks</p>                      
//       </div>
//       </div>
//       <div class="order_elements_user_icon_priolable"> 
//         <div id ="board_assignee_${taskID}" class="order_user_icons_task_card">
//         </div>
//         <img id="icon_priority_${taskID}" src="" alt="">
//       </div>
//   </div>
//     `;
// }
