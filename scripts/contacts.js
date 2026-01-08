addEventListener("resize", detectMobile)
renderMobile()



function setContactActive(email, element) {
    const isActive = element.classList.contains("active-contact");
    const cInfo = document.getElementById('contact-info')
    const contacts = document.getElementsByClassName("contact-person");
    const selectedContact = contact.find(entry => entry.email === email);
    for (let i = 0; i < contacts.length; i++) {
        contacts[i].classList.remove("active-contact");
    }
    if (isActive) {
        cInfo.innerHTML = contactHeadlineTemplate();
        return;
    }
    renderMobileClickedContact(selectedContact)
    element.classList.add("active-contact");
    renderContactInfo(selectedContact)

    slideContactInfo()
}

function renderContactInfo(selectedContact) {
    const cInfo = document.getElementById('contact-info')
    cInfo.innerHTML = contactHeadlineTemplate() + contactInitialsTemplate(selectedContact) + contactInfoTemplate(selectedContact)
}

function slideContactInfo() {
    /**
     * Wait for dom element to be ready
     * otherwise the transition wont be
     * played.
     */
    requestAnimationFrame(() => {
        const bigContact = document.getElementById('contact-big')
        const bigContactInfo = document.getElementById('contact-big-information')

        bigContact.classList.toggle('slideactive')
        bigContactInfo.classList.toggle('slideactive')
        checkForBackBtn()
    })
}

function checkForBackBtn() {
    const backBtn = document.getElementById('backBtn')
    if (backBtn.style.display != "none") {
        document.getElementById('backBtn').addEventListener("click", clickBack)
    }
}

function detectMobile() {
    return window.innerWidth
}

function renderMobileClickedContact(selectedContact) {
    const contactList = document.getElementById('contact-list-container')
    const contactInfo = document.getElementById('contact-info')
    if (detectMobile() <= 600) {
        contactInfo.classList.remove('d_none')
        contactList.classList.add('d_none')
        renderContactInfo(selectedContact)
    }
    else {
        contactList.classList.remove('d_none')
        contactInfo.classList.remove('d_none')
        renderContactInfo(selectedContact)
    }
}



function clickBack() {
    const contactList = document.getElementById('contact-list-container')
    const contactInfo = document.getElementById('contact-info')

    contactList.classList.remove('d_none')
    contactInfo.classList.add('d_none')
    const contacts = document.getElementsByClassName("contact-person");
    for (let i = 0; i < contacts.length; i++) {
        contacts[i].classList.remove("active-contact");
    }
}

function renderMobile() {
    const contactInfo = document.getElementById('contact-info')
    const contactList = document.getElementById('contact-list-container')
    if (detectMobile() <= 600) {
        contactInfo.classList.add('d_none')

    } else {

        contactInfo.classList.remove('d_none')
        contactList.classList.remove('d_none')
    }
}


function sortContactsByFirstName(contacts) {
    return [...contacts].sort((a, b) => {
        const firstNameA = a.name.split(" ")[0].toUpperCase();
        const firstNameB = b.name.split(" ")[0].toUpperCase();
        return firstNameA.localeCompare(firstNameB);
    });
}

function renderContactList() {
    const contacts = sortContactsByFirstName(contact);
    const container = document.getElementById('contact-list');

    let currentLetter = "";

    contacts.forEach((contact) => {
        const firstName = contact.name.split(" ")[0];
        const firstLetter = firstName[0].toUpperCase();

        if (firstLetter !== currentLetter) {
            currentLetter = firstLetter;
            container.innerHTML += contactSeperatorTemplate(currentLetter);
        }

        container.innerHTML += loadContactListItem(contact);
    });
}