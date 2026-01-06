function userStoryTemplate(){
    return `
        <main class="user_story_wrapper">
            <div class="close_btn_container_user_story">
                <button class="story_task_btn">User Story</button>
                <img class="close_btn" src="./assets/img/x.svg" alt="Close Button" onclick="closeUserStoryDialog()" role="button" aria-label="Schließen">
            </div>

            <span class="user_story_title">Page and Recipe Recommender</span>
            <p class="user_story_description">It provides users with personalized suggestions for pages and recipes based on their preferences.</p>
            
            <table class="recommender_table" aria-label="Page and Recipe Recommender details">
                <tbody>
                    <tr>
                    <th scope="row" class="user_story_description table_spacer">Due Date:</th>
                    <td class="user_story_description table_spacer">10/01/2026</td>
                    </tr>
                    <tr>
                    <th scope="row" class="user_story_description table_spacer">Priority:</th>
                    <td class="user_story_description table_spacer icon_gap">Urgent
                        <img src="./assets/img/prio_urgent_red.svg" alt="Prio Urgent">
                    </td>
                    </tr>
                    <tr>
                    <th scope="row" class="user_story_description table_spacer">Assigned to:</th>
                    </tr>
                </tbody>
            </table>
            <div class="assigned_user">
                <div class="user_info">
                    <img src="./assets/img/user-de.svg" alt="">
                    <p>David Eisenberg</p>
                </div>
                <div class="user_info">
                    <img src="./assets/img/user-am.svg" alt="">
                    <p>Anton Mayer</p>
                </div>
                <div class="user_info">
                    <img src="./assets/img/user-ef.svg" alt="">
                    <p>Eva Fischer</p>
                </div>
            </div>

            <p class="user_story_description">Subtasks</p>
            <div>
                <div class="subtasks_container">
                    <img onclick="toggleCheckedIcon(this)" class="checkbox_icon" data-checked="false" src="./assets/img/checkbox_unchecked_contact_form.svg" alt="Checkbox Button">
                    <p class="user_story_description">Subtask 01</p>
                </div>
                <div class="subtasks_container">
                    <img onclick="toggleCheckedIcon(this)" class="checkbox_icon" data-checked="false" src="./assets/img/checkbox_unchecked_contact_form.svg" alt="Checkbox Button">
                    <p class="user_story_description">Subtask 02</p>
                </div>
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