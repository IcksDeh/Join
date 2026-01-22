function loadContactListItem(c) {
    return `        
        <li>
            <button class="contact-person" onclick="setContactActive('${c.id}', this)" id="${c.id}">
                <span class="initals" style="background-color: ${c.color};">${getContactInitials(c.name)}</span>
                <div class="small-info">
                    <h3 id="name-${c.id}">${c.name}</h3>
                    <a href="mailto:${c.eMail}">${c.eMail}</a>
                </div>
            </button>
        </li>
    `;
}


function addContactButtonTemplate() {
    return `
        <div class="button-container">
            <button class="contact-btn" id="addNewContactBtn" onclick="openAddContactDialog()">
                <span>Add new Contact</span>
                <img src="./assets/img/person_add_white.svg" alt="add Person" />
            </button>
        </div>
    `;
}


function contactHeadlineTemplate() {
    return `
        <div class="contact-headline">
            <div class="headline">
                <h3>Contacts</h3>
                <button id="backBtn" onclick="checkForBackBtn()"></button>
            </div>
            <div class="headline-seperator"></div>
            <span>Better with a team</span>
        </div>
    `;
}


function contactInitialsTemplate(c) {
    return `
        <div class="contact-big" id="contact-big">
            <div class="initals-big" style="background-color: ${c.color};">${getContactInitials(c.name)}</div>
            <div class="name-big">
                <span id="contactDetailName">${c.name}</span>
                <div class="changebtns" id="changeContactBtns">
                    <div id="changebtnsPopover">
                        <button id="editContactBtn" class="edit_btn" onclick="openEditContactDialog('${c.id}', this)">
                            <img src="./assets/img/edit.svg" alt="Edit" />Edit
                        </button>
                        <button id="deleteContactBtn" class="delete_btn" onclick="deleteContact('${c.id}')">
                            <img src="./assets/img/delete.svg" alt="Delete" />Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}


function contactInfoTemplate(c) {
    return `       
        <div class="contact-big-information" id="contact-big-information">
            <span id="cinfo">Contact Information</span>
            <div class="contact-deep-info">
                <div class="contact-mail">
                    <span>E-Mail</span>
                    <a id="contactDetailMail" href="mailto:${c.eMail}">${c.eMail}</a>
                </div>
                <div class="contact-phone">
                    <span>Phone</span>
                    <a id="contactDetailPhone" href="tel:${c.phoneNumber}">${c.phoneNumber}</a>
                </div>
            </div>
        </div>
    `;
}


function contactSeperatorTemplate(currentLetter) {
    return `
        <li>
            <p class="beginning-letter">${currentLetter}</p>
            <div class="contact-seperator"></div>
        </li>
    `;
}