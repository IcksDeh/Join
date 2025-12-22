function addContactTemplate(){
    return `
        <main class="contact_overlay_wrapper">
            <section class="contact_left_container">
                <img class="logo_overlay" src="./assets/img/logo_version2.svg" alt="Join Logo">
                <span class="headline_overlay">Add Contact</span>
                <span class="subhead_overlay">Tasks are better with a team!</span>
                <hr class="hr_overlay">
            </section>
            <form id="addContactForm" novalidate>
                <section class="contact_right_container">
                    <div class="close_btn_container_contact_overlay">
                        <img class="close_btn" src="./assets/img/x.svg" alt="Close Button" onclick="closeAddContactDialog()" role="button" aria-label="Close Dialog">
                    </div>
                    <div class="right_container_wrapper">
                        <div>
                            <img class="contact_user_icon" src="./assets/img/person_grey_circle.svg" alt="User Icon">
                        </div>
                        <div>
                            <div class="input_fields_container">
                                <input type="text" id="id_contact_name" class="contact_input styled_input" placeholder="Name" oninput="limitInputLength(this, 25)"><br>
                                <input type="text" id="id_contact_email" class="contact_input styled_input" placeholder="Email" oninput="limitInputLength(this, 25)"><br>
                                <input type="text" id="id_contact_phone" class="contact_input styled_input" placeholder="Phone" oninput="limitInputLength(this, 25)"><br>
                            </div>
                            <div class="contact_btn_area">
                                <button type="button" class="outline_btn" onclick="closeAddContactDialog()">Cancel
                                    <img class="icon default" src="./assets/img/close.svg" alt="Clear Formular">
                                    <img class="icon hover" src="./assets/img/close_blue.svg" alt="Clear Formular Hover">
                                </button>
                                <button type="submit" id="createContactBtn" class="filled_btn">Create Contact<img src="./assets/img/check_white.svg" alt="Create Task"></button>
                            </div>
                        </div>
                    </div>    
                </section>
            </form>
        </main>
    `
}


function editContactTemplate(){
    return `
        <main class="contact_overlay_wrapper">
            <section class="contact_left_container">
                <img class="logo_overlay" src="./assets/img/logo_version2.svg" alt="Join Logo">
                <span class="headline_overlay">Edit Contact</span>
                <hr class="hr_overlay">
            </section>
            <form id="editContactForm" novalidate>
                <section class="contact_right_container">
                    <div class="close_btn_container_contact_overlay">
                        <img class="close_btn" src="./assets/img/x.svg" alt="Close Button" onclick="closeEditContactDialog()" role="button" aria-label="Close Dialog">
                    </div>
                    <div class="right_container_wrapper">
                        <div>
                            <div class="initals_big">AM</div>
                        </div>
                        <div>
                            <div class="input_fields_container">
                                <input type="text" id="name" class="user_input styled_input" placeholder="Anton Mayer" oninput="limitInputLength(this, 25)"><br>
                                <input type="text" id="email" class="user_input styled_input" placeholder="antonm@gmail.com" oninput="limitInputLength(this, 25)"><br>
                                <input type="text" id="phone" class="user_input styled_input" placeholder="+49 1111 111 111 11" oninput="limitInputLength(this, 25)"><br>
                            </div>
                            <div class="contact_btn_area">
                                <button type="button" class="outline_btn" onclick="clearContactInputs()">Delete
                                    <img class="icon default" src="./assets/img/close.svg" alt="Clear Formular">
                                    <img class="icon hover" src="./assets/img/close_blue.svg" alt="Clear Formular Hover">
                                </button>
                                <button type="submit" class="filled_btn">Save<img src="./assets/img/check_white.svg" alt="Create Task"></button>
                            </div>
                        </div>
                    </div>   
                </section>
            </form> 
        </main>
    `
}