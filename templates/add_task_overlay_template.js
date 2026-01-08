function addTaskTemplate(){
    return `
        <main>
            <form class="add_task_overlay_wrapper content_wrapper" id="addTaskForm" novalidate>
                <div class="close_btn_container">
                    <img class="close_btn" src="./assets/img/x.svg" alt="Close Button" onclick="closeAddTaskDialog()" role="button" aria-label="Close Dialog">
                </div>    
                <div>
                    <h1>Add Task</h1>
                </div>

                <div class="add_task_form_container">
                    <section class="formfield_left">
                        <div class="formfield_left_wrapper">
                            <label for="id_title_add_task" class="label_text">Title<sup>*</sup></label><br>
                            <input type="text" class="add_task_input styled_input validate-required" id="id_title_add_task" placeholder="Enter a title" oninput="handleRequiredMessage(this); limitInputLength(this, 35)" onfocus="handleRequiredMessage(this)" onblur="handleRequiredMessage(this)"><br>
                            <span class="required_message" data-for="id_title_add_task">This field is required</span><br>
                        </div>

                        <label for="id_description_add_task" class="label_text">Description</label><br>
                        <textarea class="add_task_description styled_input_description" id="id_description_add_task" placeholder="Enter a description" oninput="limitInputLength(this, 95)"></textarea><br>

                        <div class="formfield_left_wrapper">
                            <label for="id_due_date_add_task" class="label_text">Due Date<sup>*</sup></label><br>
                            <input type="date" class="add_task_input styled_input validate-required" id="id_due_date_add_task" oninput="handleRequiredMessage(this)" onfocus="handleRequiredMessage(this)" onblur="handleRequiredMessage(this)"><br>
                            <span class="required_message" data-for="id_due_date_add_task">This field is required</span><br>
                        </div>
                    </section>

                    <div class="vertical_line"></div>

                    <section class="formfield_right">
                        <label class="label_text">Priority</label><br>
                        <div class="priority_options">
                            <button type="button" class="urgent_btn_default" id="id_urgent_btn" onclick="checkPriority('urgent')">Urgent
                                <img id ="id_icon_urgent_task" src="./assets/img/prio_urgent_red.svg" alt="Priority Urgent">
                            </button>
                            <button type="button" class="medium_btn_filled" id="id_medium_btn" onclick="checkPriority('medium')">Medium
                                <img id ="id_icon_medium_task" class="icon hover" src="./assets/img/prio_medium_white.svg" alt="Priority Medium Hover">
                            </button>
                            <button type="button" class="low_btn_default" id="id_low_btn" onclick="checkPriority('low')">Low
                                <img  id ="id_icon_low_task" src="./assets/img/prio_low_green.svg" alt="Priority Low">
                            </button>
                        </div>

                        <label class="label_text">Assigned to</label><br>
                        <div class="dropdown" data-type="contacts">
                            <div class="dropdown_input add_task_input_dropdown styled_input" onclick="toggleListTasks('contacts')">
                                <span class="dropdown_text" id="selected_contacts">Select contacts to assign</span>
                                <div class="dropdown_icon"></div>
                            </div>
                            <ul class="dropdown_list_contacts" id="contacts_list_task" style="display:none;">
                            </ul>
                        </div>
                        <div class="assigned_contacts_row" id="assigned_contacts_row"></div>
                        <div class="input_spacer"></div>

                        <label class="label_text">Category<sup>*</sup></label><br>
                        <div class="dropdown" data-type="category">
                            <div class="dropdown_input add_task_input_dropdown styled_input" onclick="toggleListTasks('category')">
                                <span class="dropdown_text" id="selected_category">Select task category</span>
                                <div class="dropdown_icon"></div>
                            </div>
                            <ul class="dropdown_list" id="category_list_task" style="display:none;">
                                <li class="dropdown_item" onclick="selectCategory(this)">Technical Task</li>
                                <li class="dropdown_item" onclick="selectCategory(this)">User Story</li>
                            </ul>
                        </div>
                        <div class="input_spacer"></div>

                        <section class="subtask_wrapper">
                            <label for="subtasks" class="label_text">Subtasks</label><br>
                            <div class="input_container">
                                <input type="text" id="subtasks" class="add_task_input styled_input" placeholder="Add new subtask" oninput="limitInputLength(this, 25)">
                                <div class="subtask_actions">
                                    <button class="subtask_btn" type="button" onclick="cancelSubtask()">
                                        <img class="cancel_subtask" src="./assets/img/close.svg" alt="Cancel Subtask">
                                    </button>
                                    <div class="subtask_divider"></div>
                                    <button class="subtask_btn" type="button" onclick="addSubtask()">
                                        <img class="submit_subtask" src="./assets/img/check.svg" alt="Submit Subtask">
                                    </button>
                                </div>
                            </div>
                            <ul id="subtaskList"></ul>
                        </section>

                    </section>
                </div>

                <div class="add_task_bottom_area">
                    <div>
                        <p><sup>*</sup>This field is required</p>
                    </div>
                    <div class="add_task_btn_area">
                        <button type="button" class="clear_btn" onclick="clearInputs()">Clear
                            <img class="icon default" src="./assets/img/close.svg" alt="Clear Formular">
                            <img class="icon hover" src="./assets/img/close_blue.svg" alt="Clear Formular Hover">
                        </button>
                        <button type="submit" id="id_btn_create_task" class="create_task_btn">Create Task<img src="./assets/img/check_white.svg" alt="Create Task"></button>
                    </div>
                </div>
            </form>
        </main>
    `
}


function listSubtaskTemplate(value){
    return  `
    <div class="list_row">
        <span class="subtask_text new_subtask">${value}</span>
        <div class="list_icon_element">
            <button class="subtask_btn edit_subtask" type="button" onclick="editSubtask(this)">
            <img class="edit_subtask" src="./assets/img/edit.svg" alt="Edit Subtask">
            </button>
            <button class="subtask_btn" type="button" onclick="this.closest('li').remove()">
            <img class="delete_subtask" src="./assets/img/delete.svg" alt="Delete Subtask">
            </button>
        </div>
    </div>

    <div class="edit_container" style="display:none;">
        <input type="text" class="subtask_edit_input styled_input" value="${value}" oninput="limitInputLength(this, 25)">
        <hr class="subtask_edit_hr">
        <div class="subtask_edit_area">
            <button class="subtask_edit_btn" type="button" onclick="cancelEdit(this)">
            <img class="cancel_subtask_edit" src="./assets/img/delete.svg" alt="Delete Subtask">
            </button>
            <button class="subtask_edit_btn" type="button" onclick="saveEdit(this)">
            <img class="submit_subtask" src="./assets/img/check.svg" alt="Submit Edited Version">
            </button>
        </div>
    </div>
  `
}


function listAssigneeTemplate(contactsList, index, imgPath, checkState){
    return `
        <div class="dropdown_item_user" data-assignee-id="${contactsList[index].id}">
            <div class="user_info">
                <div class="contact_initial_circle" style="background-color: ${contactsList[index].contact.color};">
                    ${contactsList[index].contact.initial} 
                </div>
                <p class="user_name_assignee_circle">${contactsList[index].contact.name}</p>
            </div>
            <img onclick="toggleCheckedIcon(this, ${index}); event.stopPropagation();" class="checkbox_icon" data-checked="${checkState}" src="${imgPath}" alt="Checkbox Button">
        </div>
    `;
}