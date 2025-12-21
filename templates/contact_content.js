const contact = [
    {
        "name": "Max Mustermann",
        "email": "max.mustermann@gmail.com",
        "phone": "+49 170 1234567",
        "color": "#F44336"
    },
    {
        "name": "Anna Schmidt",
        "email": "anna.schmidt@yahoo.de",
        "phone": "+49 151 2345678",
        "color": "#E91E63"
    },
    {
        "name": "Lukas Weber",
        "email": "lukas.weber@outlook.com",
        "phone": "+49 160 3456789",
        "color": "#9C27B0"
    },
    {
        "name": "Laura Fischer",
        "email": "laura.fischer@web.de",
        "phone": "+49 171 4567890",
        "color": "#673AB7"
    },
    {
        "name": "Tim Schneider",
        "email": "tim.schneider@icloud.com",
        "phone": "+49 152 5678901",
        "color": "#3F51B5"
    },
    {
        "name": "Sophie Bauer",
        "email": "sophie.bauer@gmx.de",
        "phone": "+49 176 6789012",
        "color": "#2196F3"
    },
    {
        "name": "Jonas Hoffmann",
        "email": "jonas.hoffmann@t-online.de",
        "phone": "+49 157 7890123",
        "color": "#03A9F4"
    },
    {
        "name": "Marie Klein",
        "email": "marie.klein@protonmail.com",
        "phone": "+49 159 8901234",
        "color": "#009688"
    },
    {
        "name": "Paul Richter",
        "email": "paul.richter@zoho.com",
        "phone": "+49 172 9012345",
        "color": "#4CAF50"
    },
    {
        "name": "Lisa Wagner",
        "email": "lisa.wagner@mail.de",
        "phone": "+49 175 0123456",
        "color": "#FF9800"
    }
]

function loadContactListItem(c) {
    return `        
        <li>
            <button class="contact-person" onclick="setContactActive('${c.email}', this)" id="contact-${c.email}">
                <span class="initals">${c.name.split(" ").map(word => word[0]).join("")}</span>
                <div class="small-info">
                    <h3>${c.name}</h3>
                    <a href="mailto:${c.email}">${c.email}</a>
                </div>
            </button>
        </li>
    `
}

function addContactButtonTemplate() {
    return `<div class="button-container">
                <button class="contact-btn" id="addNewContactBtn" onclick="openAddContactDialog()">
                    <span>Add new Contact</span>
                    <img src="./assets/img/person_add_white.svg" alt="add Person" />
                </button>
            </div>`
}

function contactHeadlineTemplate() {
    return `
        <div class="contact-headline">
            <h3>Contacts</h3>
            <div class="headline-seperator"></div>
            <span>Better with a team</span>
        </div>
    `
}


function contactInitialsTemplate(c) {
    return `
        <div class="contact-big" id="contact-big">
            <div class="initals-big">${c.name.split(" ").map(word => word[0]).join("")}</div>
            <div class="name-big">
                <span id="contactDetailName">${c.name}</span>
                <div class="changebtns">
                    <button id="editContactBtn" class="edit_btn" onclick="openEditContactDialog()">
                        <img src="./assets/img/edit.svg" alt="Edit" />Edit
                    </button>
                    <button id="deleteContactBtn" class="delete_btn">
                        <img src="./assets/img/delete.svg" alt="Delete" />Delete
                    </button>
                </div>
            </div>
        </div>
    `
}


function contactInfoTemplate(c) {
    return `       
        <div class="contact-big-information" id="contact-big-information">
            <span id="cinfo">Contact Information</span>
            <div class="contact-deep-info">
                <div class="contact-mail">
                    <span>E-Mail</span>
                    <a id="contactDetailMail" href="mailto:${c.email}">${c.email}</a>
                </div>
                <div class="contact-phone">
                    <span>Phone</span>
                    <a id="contactDetailPhone" href="tel:${c.phone}">${c.phone}</a>
                </div>
            </div>
        </div>
    `
}

function contactSeperatorTemplate(currentLetter) {
    return `<li>
                <p class="beginning-letter">${currentLetter}</p>
                <div class="contact-seperator"></div>
            </li>`
}