const contact = [{ name: "Anton Mayer", email: "antonm@gmail.com", phone: "+491111111111" },
{ name: "Anja Schulz", email: "schulz@hotmail.com", phone: "+491111111112" },
{ name: "Benedikt Ziegler", email: "benedikt@gmail.com", phone: "+491111111113" },
{ name: "David Eisenberg", email: "davidberg@gmail.com", phone: "+491111111114" },
{ name: "Eva Fischer", email: "eva@gmail.com", phone: "+491111111115" },
{ name: "Emmauel Mauer", email: "emmanuelma@gmail.com", phone: "+491111111116" },
{ name: "Marcel Bauer", email: "bauer@gmail.com", phone: "+491111111117" },
{ name: "Tatjana Wolf", email: "wolf@gmail.com", phone: "+491111111118" }
]

function loadContactList(c, i) {
    return `        <div class="contact-person" id="contact-${i}" onclick="contactActive(this)">
                        <div class="initals">${c.name.split(" ").map(word => word[0]).join("")}</div>
                        <div class="small-info">
                            <h3>${c.name}</h3>
                            <a href="mailto:${c.email}">${c.email}</a>
                        </div>
                    </div>
    `
}

function contactHeadline() {
    return ` <div class="contact-headline">
                        <h3>Contacts</h3>
                        <div class="headline-seperator"></div>
                        <span>Better with a team</span>
                    </div>`
}

function contactInfo(c) {
    return `
                    <div class="contact-big" id="contact-big">
                        <div class="initals-big">${c.name.split(" ").map(word => word[0]).join("")}</div>
                        <div class="name-big">
                            <span id="contactDetailName">${c.name}</span>
                            <div class="changebtns">
                                <button id="editContactBtn" class="edit_btn">
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

function moreContactInfo(c) {
    return `        <div class="contact-big-information">
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
                    </div>`
}