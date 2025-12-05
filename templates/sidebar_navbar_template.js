function sidebarLoginTemplate(){
    return `
            <img class = "logo_invert" src="./assets/img/logo_version2.svg" alt="Join Logo">
            <div class="order_selection_privacy_legal_sidebar">
                <div class="sidebar_selection">
                    <div class="order_icon_selection ">
                        <img class="icon_sidebar" src="./assets/img/summary_noneactivated.svg" alt="">
                        <a href="#">Summary</a>
                    </div>
                    <div class="order_icon_selection">
                        <img class="icon_sidebar" src="./assets/img/add_task_icon.svg" alt="">
                        <a href="#">Add Task</a>
                    </div>
                    <div class="order_icon_selection">
                        <img class="icon_sidebar" src="./assets/img/board_icon.svg" alt="">
                        <a href="#">Board</a>
                    </div>
                    <div class="order_icon_selection">
                        <img class="icon_sidebar" src="./assets/img/contacts_icon.svg" alt="">
                        <a href="#">Contacts</a>
                    </div>
                </div>   
                <div class="sidebar_privacy_legal">
                    <div class="design_privacy_legal">
                        <a href="#">Privacy Policy</a>
                    </div>
                    <div class="design_privacy_legal">
                        <a href="#">Legal Notice</a>
                    </div>
                </div>
    `
}

function navbarTemplate(){
    return `
            <div class = "content_wrapper order_content_navbar">    
                <p class="text_navbar">Kanban Projekt Management Tool</p>
                <div class="help_user_icon">
                    <img src="./assets/img/help.svg" alt="Help">
                    <div class="user_circle">AM</div>
                </div>
            </div>

    `

}