function sidebarLoginTemplate(){
    return `
            <img class = "logo_invert" src="./assets/img/logo_version2.svg" alt="Join Logo">
            <div class="order_selection_privacy_legal_sidebar">
                <div class="sidebar_selection">
                    <a class="order_icon_selection" href="./summary.html">
                        <img class="icon_sidebar" src="./assets/img/summary_noneactivated.svg" alt="">
                        <p>Summary</p>
                    </a>
                    <a class="order_icon_selection" href="./add_task.html">
                        <img class="icon_sidebar" src="./assets/img/add_task_icon.svg" alt="">
                        <p>Add Task</p>

                    </a>
                    <a class="order_icon_selection" href="./board.html">
                        <img class="icon_sidebar" src="./assets/img/board_icon.svg" alt="">
                        <p>Board</p>
                    </a>
                    <a class="order_icon_selection" href="./contacts.html">
                        <img class="icon_sidebar" src="./assets/img/contacts_icon.svg" alt="">
                        <p>Contacts</p>
                    </a>
                </div>   
                <div class="sidebar_privacy_legal">
                    <a class="design_privacy_legal" href="./privacy_policy.html">Privacy Policy</a>
                    <a class="design_privacy_legal" href="./legal_notice.html">Legal Notice</a>
                </div>
            </div> 
    `
}

function sidebarLogOffTemplate(){
    return `
        <img class = "logo_invert" src="./assets/img/logo_version2.svg" alt="Join Logo">
            <div class="order_selection_privacy_legal_sidebar">
                <a class="style_login_icon_text" href="./index.html">
                    <img src="./assets/img/log_in.svg" alt="Login">
                    <p class="p_text">Log In</p>
                </a>
                <div class="sidebar_privacy_legal">
                    <a class="design_privacy_legal" href="./privacy_policy.html">Privacy Policy</a>
                    <a class="design_privacy_legal" href="./legal_notice.html">Legal Notice</a>
                </div>
            </div>
    `
}

function navbarTemplate(){
    return `
            <div class = "content_wrapper order_content_navbar">    
                <p class="text_navbar">Kanban Projekt Management Tool</p>
                <div class="help_user_icon">
                         <a href="./help.html"><img class="help_icon" src="./assets/img/help.svg" alt="Help"></a>
                    <div class="user_circle">AM</div>
                </div>
            </div>

    `

}